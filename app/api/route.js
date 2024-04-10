import UniversityQualifications from "@/lib/web3/universityQualifications";

// Example route for educational purposes
export async function GET(req, res) {
    try {
        const studentId = "0x775e22e991fdA0E0c089c8D860e1E2CD0068D314";

        const data = await UniversityQualifications.getQualifications(studentId);

        console.log(data);

        convertBigInts(data);

        return Response.json({ data: JSON.stringify(data) })
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error interacting with the smart contract' })
    }

}

// Maybe move to a utility file
// But should not be necessary in production, because we will not use API Routes
function convertBigInts(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'bigint') {
            // Convert to Number if within safe range, else handle it differently (e.g., convert to string or throw an error)
            obj[key] = BigInt.asIntN(53, obj[key]) <= Number.MAX_SAFE_INTEGER ? Number(obj[key]) : handleOutOfRange();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursively handle nested objects
            convertBigInts(obj[key]);
        }
    }
}

function handleOutOfRange() {
    // Handle the out-of-range case (e.g., convert to string, throw an error, etc.)
    // For example, converting to string to prevent loss of precision:
    return "Value out of range"; // Adjust this based on your requirements
}