import SmartContractServer from "@/lib/web3/smart-contract-server";
import AddressWrapper from "./components/address-wrapper";

async function Page() {
  const applicants = (await SmartContractServer.getApplicants()) || [];

  return <AddressWrapper applicants={applicants} />;
}

export default Page;
