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

import { Qualification } from "@/lib/structures";

function QualificationsPage({ params }) {
    const studentAddress = params?.user || null;

    const [smartContractClient, setSmartContractClient] = useState(null);
    const [qualifications, setQualifications] = useState([]);
    const [isQualificationsLoading, setIsQualificationsLoading] =
        useState(true);
    const [name, setName] = useState("Not provided");
    const [isNameLoading, setIsNameLoading] = useState(true);

    useEffect(() => {
        setSmartContractClient(SmartContractClient);

        if (!smartContractClient) {
            console.log("smartContractClient", smartContractClient);
            return;
        }
    }, []);

    useEffect(() => {
        if (!smartContractClient) {
            return;
        }

        if (!studentAddress) {
            console.error("No student address provided");
            return;
        }

        const data = async () => {
            const data = await smartContractClient.getQualifications(
                studentAddress
            );
            setQualifications(data);
            setIsQualificationsLoading(false);
        };

        data();
    }, [smartContractClient]);

    useEffect(() => {
        if (!smartContractClient) {
            return;
        }

        if (!studentAddress) {
            console.error("No student address provided");
            return;
        }

        const data = async () => {
            const data = await smartContractClient.getName(studentAddress);
            setName(data);
            setIsNameLoading(false);
        };

        data();
    }, [smartContractClient]);

    return (
        <main className="h-screen p-10 flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">
                Qualifications for {studentAddress}
            </h1>
            <h2 className="text-xl">
                Name of Student: {isNameLoading ? "Loading..." : name}
            </h2>
            {isQualificationsLoading
                ? "Loading..."
                : qualifications.length == 0
                ? "No data"
                : qualifications.map((qualification, index) => (
                      <Card key={index}>
                          <CardHeader>
                              <CardTitle>{qualification.name}</CardTitle>
                              <CardDescription>
                                  Issued by: {qualification.issuedBy}
                                  <br />
                                  Issue Date:{" "}
                                  {qualification.issueDate
                                      ? new Date(
                                            qualification.issueDate.toString() *
                                                1000
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
                                      ? Qualification[
                                            qualification.qualificationType
                                        ]
                                      : "No Type"}
                              </p>
                          </CardFooter>
                      </Card>
                  ))}
        </main>
    );
}

export default QualificationsPage;
