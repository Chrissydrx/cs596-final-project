"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingScreen from "@/components/ui/loading-screen";
import SmartContractClient from "@/lib/web3/smart-contract-client";

import { useState } from "react";

function AddressCard({ applicant, setActionCount }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event, buttonType) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await SmartContractClient().vote(applicant, buttonType);
      setActionCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{applicant}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center gap-4">
          <Button
            type="button"
            disabled={isLoading}
            onClick={(event) => handleSubmit(event, "Y")}
            className="bg-green-600 hover:bg-green-700 w-[200px]"
          >
            Accept
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={(event) => handleSubmit(event, "N")}
            className="bg-red-600 hover:bg-red-700 w-[200px]"
          >
            Reject
          </Button>
        </CardFooter>
      </Card>
      <LoadingScreen visible={isLoading} />
      <br />
    </form>
  );
}

export default AddressCard;
