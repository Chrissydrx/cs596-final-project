"use server";

import { cookies } from "next/headers";

async function writeCookie(address) {
  cookies().set({
    name: "address",
    value: address,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export default writeCookie;
