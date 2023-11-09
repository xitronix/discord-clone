"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatAttachment } from "./ChatAttachment";
import { EmojiPicker } from "@/components/EmojiPicker";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "dm" | "channel";
}

const formSchema = z
  .object({
    content: z.string().min(0),
    fileUrl: z.string().min(0),
  })
  .partial()
  .refine((data) => data.content || data.fileUrl, "No data");

export const ChatInput = ({ apiUrl, name, type, query }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      fileUrl: "",
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(
        `${apiUrl}?${Object.keys(query)[0]}=${Object.values(query)[0]}&serverId=${
          query.serverId
        }`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );
      form.reset();
      router.refresh();
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
                    <Button variant="ghost" size="icon" type="button" asChild>
                      <EmojiPicker
                        onChange={(emoji) => {
                          const selectionStart =
                            inputRef.current?.selectionStart || 0;
                          const selectionEnd =
                            inputRef.current?.selectionEnd || 0;
                          field.onChange(
                            field.value.slice(0, selectionStart) +
                              emoji +
                              field.value.slice(selectionEnd)
                          );
                        }}
                      />
                    </Button>
                    <Input
                      disabled={isLoading}
                      className="px-12 w-full dark:bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0  border-0 border-none"
                      placeholder={`Message ${
                        type === "dm" ? "@" : "#"
                      }${name}`}
                      onChange={field.onChange}
                      value={field.value}
                      ref={inputRef}
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
