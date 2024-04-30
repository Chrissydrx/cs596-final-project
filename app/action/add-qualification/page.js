"use client";

import TypographyH1 from "@/components/typography/typography-h1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/ui/loading-screen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Qualification } from "@/lib/structures";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useState } from "react";

// Form Validations
const formSchema = z.object({
  ethAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message:
      "Invalid Ethereum address. Must start with '0x' followed by 40 hexadecimal characters.",
  }),
  qualificationName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

function Page() {
  const [qualificationDescription, setQualificationDescription] = useState("");
  const [qualificationType, setQualificationType] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);


  const handleQualificationDescription = (event) => {
    setQualificationDescription(event.target.value);
  };

  const handleQualificationType = (index) => {
    setQualificationType(index);
    console.log("Selected index:", index); // You can remove this line or use it for further processing
  };

  const onSubmit = async (value) => {

    const indexQualificationType = Qualification.findIndex(
      (element) => element == qualificationType
    );

    setIsLoading(true);
    try {
      await SmartContractClient().addQualification(
        value.ethAddress,
        value.qualificationName,
        qualificationDescription,
        indexQualificationType
      );

      window.location.href = "/action";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ethAddress: "",
      qualificationName: "",
    },
  });

  return (
    <Form {...form}>
      <TypographyH1>What qualification would you like to add?</TypographyH1>
      <br />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          className="flex flex-col justify-center"
          name="ethAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <Input
                  placeholder="Student's public address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />

        <FormField
          control={form.control}
          className="flex flex-col justify-center"
          name="qualificationName"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <Input
                  placeholder="Qualification Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />
        <FormField
          //control={form.control}
          className="flex flex-col justify-center"
          name="qualificationDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <Input
                  type="text"
                  value={qualificationDescription}
                  onChange={handleQualificationDescription}
                  placeholder="Qualification Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />

        <FormField
          //control={form.control}
          className="flex flex-col justify-center"
          name="qualificationType"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <Select onValueChange={setQualificationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qualification Type" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    {Qualification.map((qual, index) => (
                      <SelectItem key={index} value={qual}>
                        {qual}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />

        <Button type="submit" disabled={isLoading}>
          Add Qualification
        </Button>
      </form>
      <LoadingScreen visible={isLoading} />
    </Form>
  );
}

export default Page;