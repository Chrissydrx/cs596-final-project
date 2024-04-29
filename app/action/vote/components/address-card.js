"use client";

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
      <p>{applicant}</p>
      <button
        type="button"
        disabled={isLoading}
        onClick={(event) => handleSubmit(event, "Y")}
      >
        {isLoading ? "Loading..." : "Yes"}
      </button>
      <button
        type="button"
        disabled={isLoading}
        onClick={(event) => handleSubmit(event, "N")}
      >
        {isLoading ? "Loading..." : "No"}
      </button>
      <hr />
    </form>
  );
}

export default AddressCard;
