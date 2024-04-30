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
import { Qualification } from "@/lib/structures";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useState } from "react";

function Page() {
  const [studentAddress, setStudentAddress] = useState("");
  const [qualificationName, setQualificationName] = useState("");
  const [qualificationDescription, setQualificationDescription] = useState("");
  const [qualificationType, setQualificationType] = useState(-1);
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

  const handleQualificationType = (index) => {
    setQualificationType(index);
    console.log("Selected index:", index); // You can remove this line or use it for further processing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const indexQualificationType = Qualification.findIndex(
      (element) => element == qualificationType
    );

    setIsLoading(true);
    try {
      await SmartContractClient().addQualification(
        studentAddress,
        qualificationName,
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

  return (
    <>
      <TypographyH1>What qualification would you like to add?</TypographyH1>
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={studentAddress}
          onChange={handleStudentAddress}
          placeholder="Student's public address"
        />

        <br />

        <Input
          type="text"
          value={qualificationName}
          onChange={handleQualificationName}
          placeholder="Qualification Name"
        />

        <br />

        <Input
          type="text"
          value={qualificationDescription}
          onChange={handleQualificationDescription}
          placeholder="Qualification Description"
        />

        <br />

        <Select onValueChange={setQualificationType}>
          <SelectTrigger>
            <SelectValue placeholder="Qualification Type" />
          </SelectTrigger>
          <SelectContent>
            {Qualification.map((qual, index) => (
              <SelectItem key={index} value={qual}>
                {qual}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <br />

        <Button type="submit" disabled={isLoading}>
          Add Qualification
        </Button>
      </form>
      <LoadingScreen visible={isLoading} />
    </>
  );
}

export default Page;
