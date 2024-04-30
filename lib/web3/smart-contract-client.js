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
      this.contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
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
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

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

  async getName(studentAddress) {
    if (this.contract) {
      try {
        const data = await this.contract.methods.getName(studentAddress).call();

        console.log("Name:", data);

        return data.length > 0 ? data : "No name found!";
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not get name!");
      }
    }
  }

  async isRegisteredUniversity(address) {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .isRegisteredUniversity(address)
          .call();

        console.log("isRegisteredUniversity:", data);

        return data;
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not get name!");
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

  async getQualifications(studentAddress) {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .getQualifications(studentAddress)
          .call();

        console.log("Qualifications:", data);

        return data;
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not get qualifications!");
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

  async vote(applicant, vote) {
    if (vote !== "Y" && vote !== "N") {
      throw new Error("Vote must be Y or N");
    }

    if (this.contract) {
      try {
        const data = await this.contract.methods
          .vote(applicant, vote)
          .send({ from: await this.getAccount() });
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not vote!");
      }
    }
  }

  async getApplicantsFilteredForVoter(voterAddress) {
    if (this.contract) {
      try {
        const data = await this.contract.methods
          .getApplicantsFilteredForVoter(voterAddress)
          .call();

        console.log("Applicants:", data);

        return data;
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Could not get applicants!");
      }
    }
  }
}

export default SmartContractClient.getInstance;
