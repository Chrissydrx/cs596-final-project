"use client";

import { useState } from "react";

function AddressCard({ smartContractClient, applicant }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event, buttonType) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      console.log("applicant", applicant);
      console.log("buttonType", buttonType);
      await smartContractClient.vote(applicant, buttonType);
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
