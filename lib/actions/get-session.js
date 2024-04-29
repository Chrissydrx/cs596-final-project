"use server";

import { cookies } from "next/headers";

async function getSession() {
  const address = cookies().get("address");
  const isRegisteredUniversity = cookies().get("isRegisteredUniversity");

  return [
    address ? address.value : null,
    isRegisteredUniversity ? isRegisteredUniversity.value : false,
  ];
}

export default getSession;
