"use client";

import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";
import AddressCard from "./address-card";

function AddressWrapper({ applicants }) {
  const [smartContractClient, setSmartContractClient] = useState(null);

  useEffect(() => {
    setSmartContractClient(SmartContractClient);
  }, []);

  return (
    applicants.map((applicant) => (
      <AddressCard
        key={applicant}
        smartContractClient={smartContractClient}
        applicant={applicant}
      />
    )) || "No applicants found!"
  );
}

export default AddressWrapper;
