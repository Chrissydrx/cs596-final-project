"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";

function Page() {
  const [smartContractClient, setSmartContractClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSmartContractClient(SmartContractClient);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await smartContractClient.applyToBeRegistered();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Set yourself on the list</p>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Page;
