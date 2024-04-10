import UniversityQualifications from "@/lib/web3/universityQualifications";

export default async function Page (){

    //Replace with query parameter
    const studentId = "0x775e22e991fdA0E0c089c8D860e1E2CD0068D314";

    const data = await UniversityQualifications.getQualifications(studentId);

    return (
        <div>
            <h1>Qualifications for {studentId}</h1>

            
        
            {data.length == 0 ? "No data" : data.map((qualification, index) => (
                <div key={index}>
                    <p>{qualification.name}</p>
                    <p>{qualification.description}</p>
                    <p>{qualification.issuedBy}</p>
                    <p>{qualification.issueDate}</p>
                    <p>{qualification.qualificationType}</p>
                </div>
            ))}

        </div>
    );
}