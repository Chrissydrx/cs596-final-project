"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";

import TypographyH1 from "@/components/typography/typography-h1";
import TypographyH2 from "@/components/typography/typography-h2";
import TypographyH3 from "@/components/typography/typography-h3";
import { Qualification } from "@/lib/structures";

function QualificationsPage({ params }) {
  const studentAddress = params?.user || null;

  const [qualifications, setQualifications] = useState([]);
  const [isQualificationsLoading, setIsQualificationsLoading] = useState(true);
  const [name, setName] = useState("Not provided");
  const [isNameLoading, setIsNameLoading] = useState(true);

  useEffect(() => {
    if (!studentAddress) {
      console.error("No student address provided");
      return;
    }

    const data = async () => {
      const data = await SmartContractClient().getQualifications(
        studentAddress
      );
      setQualifications(data);
      setIsQualificationsLoading(false);
    };

    data();
  }, []);

  useEffect(() => {
    if (!studentAddress) {
      console.error("No student address provided");
      return;
    }

    const data = async () => {
      const data = await SmartContractClient().getName(studentAddress);
      setName(data);
      setIsNameLoading(false);
    };

    data();
  }, []);

  return (
    <main className="h-screen p-10 flex flex-col gap-3">
      <TypographyH1>Qualifications for</TypographyH1>
      <TypographyH2>{studentAddress}</TypographyH2>
      <TypographyH3 className="text-xl">
        Name of Student: {isNameLoading ? "Loading..." : name}
      </TypographyH3>
      <br />
      {isQualificationsLoading
        ? "Loading..."
        : qualifications.length === 0
        ? "No data"
        : renderQualifications(qualifications)}
    </main>
  );
}

function renderQualifications(qualifications) {
  return qualifications.map((qualification, index) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{qualification.name}</CardTitle>
        <CardDescription>
          Issued by: {qualification.issuedBy}
          <br />
          Issue Date:{" "}
          {qualification.issueDate
            ? new Date(
                qualification.issueDate.toString() * 1000
              ).toLocaleDateString("en-US")
            : "No Issue Date"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{qualification.description}</p>
      </CardContent>
      <CardFooter>
        <p>
          Qualification Type:{" "}
          {qualification.qualificationType ||
          qualification.qualificationType == 0
            ? Qualification[qualification.qualificationType]
            : "No Type"}
        </p>
      </CardFooter>
    </Card>
  ));
}

export default QualificationsPage;
