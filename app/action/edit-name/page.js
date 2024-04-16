"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";

function Page() {
  const [smartContractClient, setSmartContractClient] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSmartContractClient(SmartContractClient);
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await smartContractClient.addName(name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        style={{ border: "2px solid black" }}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Page;
