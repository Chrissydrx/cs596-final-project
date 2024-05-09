import TypographyH1 from "@/components/typography/typography-h1";
import { cookies } from "next/headers";
import AddressWrapper from "./components/address-wrapper";

function Page() {
  const address = cookies().get("address").value;

  return (
    <>
      <TypographyH1>Who should become a university?</TypographyH1>
      <br />
      <AddressWrapper address={address} />
    </>
  );
}

export default Page;
