"use server";

import { cookies } from "next/headers";

async function getAddress() {
  const cookie = cookies().get("address");

  return cookie ? cookie.value : null;
}

export default getAddress;
