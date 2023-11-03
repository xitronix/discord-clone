"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "dm" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, name, type, query }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-3 mb-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    type="button"
                    className="absolute flex justify-center items-center p-1 w-6 h-6 top-5 left-5 rounded-full bg-foreground hover:bg-primary-foreground"
                  >
                    <Plus className="text-background" />
                  </Button>
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
                    className="px-10 w-full dark:bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0  border-0 border-none"
                    placeholder={`Message ${type === "dm" ? "@" : "#"}${name}`}
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
