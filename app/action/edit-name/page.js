"use client";

import TypographyH1 from "@/components/typography/typography-h1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/ui/loading-screen";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useState } from "react";

function Page() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await SmartContractClient().addName(name);
      window.location.href = "/action";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TypographyH1>What name should be displayed?</TypographyH1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
          <Button type="submit" disabled={isLoading}>
            Change
          </Button>
        </div>
      </form>
      <LoadingScreen visible={isLoading} />
    </>
  );
}

export default Page;
