"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";
import AddressCard from "./address-card";

function AddressWrapper({ address }) {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionCount, setActionCount] = useState(0);

  console.log("AddressWrapper", address);

  useEffect(() => {
    const data = async () => {
      const data = await SmartContractClient().getApplicantsFilteredForVoter(
        address
      );
      setApplicants(data);
      setIsLoading(false);
    };

    data();
  }, [actionCount]);

  return (
    <>
      {isLoading
        ? "Loading..."
        : applicants.map((applicant) => (
            <AddressCard
              key={applicant}
              applicant={applicant}
              setActionCount={setActionCount}
            />
          )) || "No applicants found!"}
    </>
  );
}

export default AddressWrapper;
