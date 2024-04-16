import abi from "./abi";
import web3Singleton from "./web3Singleton";

class UniversityQualifications {
  /**
   * Retrieves the qualifications for a given student.
   * @param {string} studentAddress - The address of the student.
   * @returns {Promise<Array<Object>>} - A promise that resolves to the qualifications data.
   */
  static async getQualifications(studentAddress) {
    const web3 = web3Singleton.getInstance();
    const contractAddress = process.env.SMART_CONTRACT_ADDRESS;

    try {
      const myContract = new web3.eth.Contract(abi, contractAddress);

      const data = await myContract.methods
        .getQualifications(studentAddress)
        .call();

      return data;
    } catch (error) {
      console.error("Error getting qualifications:", error);
      return [];
    }
  }

  /**
   * Retrieves the name for a given student.
   * @param {string} studentAddress - The address of the student.
   * @returns {Promise<String>} - A promise that resolves to the qualifications data.
   */
  static async getName(studentAddress) {
    const web3 = web3Singleton.getInstance();
    const contractAddress = process.env.SMART_CONTRACT_ADDRESS;

    try {
      const myContract = new web3.eth.Contract(abi, contractAddress);

      const data = await myContract.methods.getName(studentAddress).call();

      return data;
    } catch (error) {
      console.error("Error getting name:", error);
      return "";
    }
  }
}

export default UniversityQualifications;
