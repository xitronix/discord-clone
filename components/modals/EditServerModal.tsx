"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
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
import { UploadFile } from "../UploadFile";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { useEffect } from "react";

const formSchema = zod.object({
  name: zod.string().min(1, "Server name is required"),
  imageUrl: zod.string().min(1, "Server image is required"),
});

export const EditServerModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "editServer";

  const form = useForm({
    resolver: zodResolver(formSchema, { async: true }),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    if (!server) return;
    form.setValue("imageUrl", server?.imageUrl);
    form.setValue("name", server?.name);
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/servers/${server?.id}`, {
        body: JSON.stringify(values),
        method: "PATCH",
      });
      form.reset();
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
        <DialogHeader className="px-6">
          <DialogTitle className="text-center text-bold text-xl">
            Create server
          </DialogTitle>
          <DialogDescription className="text-center">
            Customize your server with a name and an picture. You can change it
            later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full justify-center items-center pb-4">
                  <FormControl>
                    <UploadFile onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold dark:text-zinc-500">
                    Server Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:bg-zinc-600/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            </div>
            <DialogFooter className="pt-6">
              <Button type="submit" disabled={isLoading} variant="default">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
