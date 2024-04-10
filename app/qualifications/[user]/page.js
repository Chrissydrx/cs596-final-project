import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UniversityQualifications from "@/lib/web3/universityQualifications";

async function QualificationsPage({params}) {

//0x775e22e991fdA0E0c089c8D860e1E2CD0068D314
  const studentAddress = params?.user || "No User provided";

  const data = await UniversityQualifications.getQualifications(studentAddress);
  const name = await UniversityQualifications.getName(studentAddress);

  return (
    <main className="h-screen p-10 flex flex-col gap-3">
      <h1>Qualifications for {studentAddress}</h1>
      <h2>{name ? name : "No name provided"}</h2>
      <h3>{params?.user || "No User provided"}</h3>
      {data.length == 0 ? "No data" : data.map((qualification, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{qualification.name}</CardTitle>
          <CardDescription>{qualification.issuedBy}, {qualification.issueDate ? qualification.issueDate : "No Issue Date"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{qualification.description}</p>
        </CardContent>
        <CardFooter>
          <p>{qualification.qualificationType}</p>
        </CardFooter>
      </Card>
      ))}
    </main>
  );
}

export default QualificationsPage;
