"use client";

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
