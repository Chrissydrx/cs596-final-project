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
      this.contractAddress = "0xd67c9405757dcE03b65390f83A780a084fd8Ca85";
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

  async addQualification(
    studentAddress,
    qualificationName,
    qualificationDescription,
    qualificationType
  ) {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .addQualification(
            studentAddress,
            qualificationName,
            qualificationDescription,
            qualificationType
          )
          .send({ from: await this.getAccount() });

        console.log("Data:", data);
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not add qualification!");
      }
    }
  }

  async applyToBeRegistered() {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .applyToBeRegistered()
          .send({ from: await this.getAccount() });

        console.log("Data:", data);
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not add you to the list!");
      }
    }
  }
}

export default SmartContractClient.getInstance;
