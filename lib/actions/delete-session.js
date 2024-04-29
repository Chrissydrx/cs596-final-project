"use server";

import { cookies } from "next/headers";

async function deleteSession(data) {
  cookies().delete("address");
  cookies().delete("isRegisteredUniversity");
}

export default deleteSession;
