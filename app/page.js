"use client";
import LoginButton from "@/components/login-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export default function Home() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(value) {
    router.push(`/qualification/${value.username}`);
  }

  return (
    <main className="h-screen p-20 flex flex-col justify-center">
      <LoginButton className="fixed top-1 right-1" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col justify-center"
        >
          <FormField
            control={form.control}
            className="flex flex-col justify-center"
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Public Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your Address" {...field} />
                </FormControl>
                <FormDescription>
                  Search for qualifications from a specific public address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </main>
  );
}
