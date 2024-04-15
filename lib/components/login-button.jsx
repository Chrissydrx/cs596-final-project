"use client";

import getAddress from "@/lib/actions/getAddress";
import saveAddress from "@/lib/actions/saveAddress";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function LoginButton({ className }) {
  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
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
