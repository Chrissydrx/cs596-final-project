"use client";

import TypographyH1 from "@/components/typography/typography-h1";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/ui/loading-screen";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useState } from "react";

function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await SmartContractClient().applyToBeRegistered();
      window.location.href = "/action";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TypographyH1>Do you want to become a university candidate?</TypographyH1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center space-x-2">
          <Button type="submit" disabled={isLoading}>
            Set me as a candidate
          </Button>
        </div>
      </form>
      <LoadingScreen visible={isLoading} />
    </>
  );
}

export default Page;
