"use client";

import { Button } from "@/components/ui/button";
import getAddress from "@/lib/actions/get-address";
import saveAddress from "@/lib/actions/save-address";
import { useEffect, useState } from "react";

function LoginButton({ className }) {
  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          console.error("No account found");
          return;
        }

        const address = accounts[0];
        await saveAddress(address);
        redirectToAction();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const redirectToAction = () => {
    window.location.href = "/action";
  };

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };

    fetchAddress();
  }, []);

  if (address == null) {
    return (
      <Button className={className} onClick={connectWalletHandler}>
        Connect MetaMask Wallet
      </Button>
    );
  }

  return (
    <Button className={className} onClick={redirectToAction}>
      {address}
    </Button>
  );
}

export default LoginButton;
