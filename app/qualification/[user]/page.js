import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SmartContractServer from "@/lib/web3/smart-contract-server";

import { Qualification } from "@/lib/structures";

async function QualificationsPage({ params }) {
  const studentAddress = params?.user || "No User provided";

  const data = await SmartContractServer.getQualifications(studentAddress);
  const name = await SmartContractServer.getName(studentAddress);

  return (
    <main className="h-screen p-10 flex flex-col gap-3">
      <h1 className="text-3xl font-semibold">
        Qualifications for {studentAddress}
      </h1>
      <h2 className="text-xl">
        Name of Student: {name ? name : "No name provided"}
      </h2>
      {data.length == 0
        ? "No data"
        : data.map((qualification, index) => (
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
          ))}
    </main>
  );
}

export default QualificationsPage;
