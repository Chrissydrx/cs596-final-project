"use client";

import writeCookie from "@/lib/actions/writeCookie";

const Page = () => {
  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];

        await writeCookie(address);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <button onClick={connectWalletHandler}>Connect MetaMask Wallet</button>
  );
};

export default Page;
