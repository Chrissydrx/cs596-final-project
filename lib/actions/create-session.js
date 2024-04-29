"use server";

import { cookies } from "next/headers";

async function createSession(address, isRegisteredUniversity) {
  cookies().set({
    name: "address",
    value: address,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  cookies().set({
    name: "isRegisteredUniversity",
    value: isRegisteredUniversity,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export default createSession;
