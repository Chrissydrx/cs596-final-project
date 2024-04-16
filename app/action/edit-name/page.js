"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";

function Page() {
  const [smartContractClient, setSmartContractClient] = useState(null);

  useEffect(() => {
    setSmartContractClient(new SmartContractClient());
  }, []);

  const callContract = async () => smartContractClient.addName("Test2");

  return <button onClick={callContract}>Call Contract</button>;

  /*
  return (
    <>J
      <h1>Edit Name</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
  */
}

export default Page;
