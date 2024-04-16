import abi from "@/lib/web3/abi";
import Web3 from "web3";

class SmartContractClient {
  static instance = null;
  web3 = null;
  contract = null;
  contractAddress = null;
  accountAddress = null;

  constructor() {
    if (SmartContractClient.instance) {
      this.web3 = SmartContractClient.instance.web3;
      this.contract = SmartContractClient.instance.contract;
      this.contractAddress = SmartContractClient.instance.contractAddress;
      this.accountAddress = SmartContractClient.instance.accountAddress;
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      this.contractAddress = "0x834c234b04a718ec98b9272e5b5bdc6f285edfc9";
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
      SmartContractClient.instance = this;
    } else {
      alert("Please install MetaMask!");
      throw new Error("Please install MetaMask!");
    }
  }

  static getInstance() {
    // Static method to get the singleton instance
    if (!SmartContractClient.instance) {
      SmartContractClient.instance = new SmartContractClient();
    }
    return SmartContractClient.instance;
  }

  async getAccount() {
    if (this.accountAddress) {
      return this.accountAddress;
    }

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        this.accountAddress = accounts[0];
        return this.accountAddress;
      } catch (error) {
        throw new Error("Could not get account address!");
      }
    } else {
      alert("Please install MetaMask!");
      throw new Error("Please install MetaMask!");
    }
  }

  async addName(name) {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .addName(name)
          .send({ from: await this.getAccount() });

        console.log("Data:", data);
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not add name!");
      }
    }
  }
}

export default SmartContractClient.getInstance;
