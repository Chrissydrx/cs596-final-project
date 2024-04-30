"use client";
import LoginButton from "@/components/login-button";
import TypographyH1 from "@/components/typography/typography-h1";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ethAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message:
      "Invalid Ethereum address. Must start with '0x' followed by 40 hexadecimal characters.",
  }),
});

export default function Home() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ethAddress: "",
    },
  });

  function onSubmit(value) {
    router.push(`/qualification/${value.ethAddress}`);
  }

  return (
    <>
      <LoginButton className="fixed top-1 right-1" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <TypographyH1>Search for Qualifications</TypographyH1>
          <br />
          <FormField
            control={form.control}
            className="flex flex-col justify-center"
            name="ethAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="Enter a public address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </>
  );
}
