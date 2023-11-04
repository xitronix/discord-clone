"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
import { ChatAttachment } from "./ChatAttachment";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "dm" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
  fileUrl: z.string().min(0),
});

export const ChatInput = ({ apiUrl, name, type, query }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      fileUrl: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(
        `${apiUrl}?channelId=${query.channelId}&serverId=${query.serverId}`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative p-1 mb-4">
          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ChatAttachment
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="absolute flex justify-center items-center w-6 h-6 top-5 right-5 rounded-full"
                    >
                      <Smile className="text-foreground hover:text-primary-foreground" />
                    </Button>
                    <Input
                      disabled={isLoading}
                      className="px-12 w-full dark:bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0  border-0 border-none"
                      placeholder={`Message ${
                        type === "dm" ? "@" : "#"
                      }${name}`}
                      {...field}
                    />
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
