"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormMessage,
  FormLabel,
  FormItem,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { ChannelType } from "@prisma/client";
import { cn } from "@/lib";
import { ChannelIcon } from "@/components/ChannelIcon";

const formSchema = zod.object({
  name: zod.string().min(1, "Channel name is required"),
  type: zod.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema, { async: true }),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/channels/?serverId=${server?.id}`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      router.refresh();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center capitalize text-2xl">
            Create channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" px-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold dark:text-zinc-500">
                      Channel type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {Object.values(ChannelType).map((type) => (
                          <ChannelRadioItem
                            selectedType={field.value}
                            type={type}
                            key={type}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-col h-16">
                    <FormLabel className="uppercase text-xs font-bold dark:text-zinc-500">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <FormLabel className="relative flex">
                        <Input
                          className="dark:bg-[#2B2D31] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 absolute pl-9 h-12"
                          placeholder="new-channel"
                          {...field}
                        />
                        <ChannelIcon
                          type={form.getValues().type}
                          className="h-4 w-4 absolute top-4 left-3"
                        />
                      </FormLabel>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isLoading} variant="default">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const ChannelRadioItem = ({
  type,
  selectedType,
}: {
  type: ChannelType;
  selectedType: ChannelType;
}) => {
  return (
    <FormItem
      className={cn(
        "w-full flex justify-between pr-4 items-center gap-2 space-y-0 dark:bg-[#2B2D31] bg-[#F2F3F5]",
        selectedType === type
          ? "dark:bg-primary bg-[#d4d7de]"
          : "dark:hover:bg-[#2B2D31]/50 hover:bg-[#d4d7de]/50"
      )}
    >
      <FormLabel className="p-4 cursor-pointer peer-aria-checked:bg-primary w-full h-full flex gap-2 items-center capitalize font-bold">
        <ChannelIcon type={type} />
        {type.toLowerCase()}
      </FormLabel>
      <FormControl>
        <RadioGroupItem className="peer" value={type} />
      </FormControl>
    </FormItem>
  );
};
