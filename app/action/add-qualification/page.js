"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useState } from "react";

function Page() {
  const [studentAddress, setStudentAddress] = useState("");
  const [qualificationName, setQualificationName] = useState("");
  const [qualificationDescription, setQualificationDescription] = useState("");
  const [qualificationType, setQualificationType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentAddress = (event) => {
    setStudentAddress(event.target.value);
  };

  const handleQualificationName = (event) => {
    setQualificationName(event.target.value);
  };

  const handleQualificationDescription = (event) => {
    setQualificationDescription(event.target.value);
  };

  const handleQualificationType = (event) => {
    setQualificationType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await SmartContractClient().addQualification(
        studentAddress,
        qualificationName,
        qualificationDescription,
        qualificationType
      );
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
        value={studentAddress}
        onChange={handleStudentAddress}
        placeholder="Student Address"
        style={{ border: "2px solid black" }}
      />
      <br />
      <input
        type="text"
        value={qualificationName}
        onChange={handleQualificationName}
        placeholder="Qualification Name"
        style={{ border: "2px solid black" }}
      />
      <br />

      <input
        type="text"
        value={qualificationDescription}
        onChange={handleQualificationDescription}
        placeholder="Qualification Description"
        style={{ border: "2px solid black" }}
      />
      <br />

      <input
        type="number"
        value={qualificationType}
        onChange={handleQualificationType}
        placeholder="Qualification Type"
        style={{ border: "2px solid black" }}
      />
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Page;
