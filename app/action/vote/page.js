import { cookies } from "next/headers";
import AddressWrapper from "./components/address-wrapper";

function Page() {
  const address = cookies().get("address").value;

  return <AddressWrapper address={address} />;
}

export default Page;
