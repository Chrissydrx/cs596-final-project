"use client";

import { Button } from "@/components/ui/button";
import deleteSession from "@/lib/actions/delete-session";

function LogoutButton({ className }) {
  const deleteActiveSession = async () => {
    await deleteSession();
    redirectToAction();
  };

  const redirectToAction = () => {
    window.location.href = "/";
  };

  return (
    <Button className={className} onClick={deleteActiveSession}>
      Logout
    </Button>
  );
}

export default LogoutButton;
