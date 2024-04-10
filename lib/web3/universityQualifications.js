import abi from './abi';
import web3Singleton from './web3Singleton';

class UniversityQualifications {
    /**
     * Retrieves the qualifications for a given student.
     * @param {string} studentId - The ID of the student.
     * @returns {Promise<Array<Object>>} - A promise that resolves to the qualifications data.
     */
    static async getQualifications(studentId) {
        const web3 = web3Singleton.getInstance();
        const contractAddress = process.env.SMART_CONTRACT_ADDRESS;

        try {
            const myContract = new web3.eth.Contract(abi, contractAddress);

            const data = await myContract.methods.getQualifications(studentId).call();

            return data;
        } catch (error) {
            console.error('Error getting qualifications:', error);
            return [];
        }
        
    }

    /**
     * Retrieves the name for a given student.
     * @param {string} studentId - The ID of the student.
     * @returns {Promise<String>} - A promise that resolves to the qualifications data.
     */
    static async getName (studentId) {
        const web3 = web3Singleton.getInstance();
        const contractAddress = process.env.SMART_CONTRACT_ADDRESS;

        try {
            const myContract = new web3.eth.Contract(abi, contractAddress);

            const data = await myContract.methods.getName(studentId).call();

            return data;
        } catch (error) {
            console.error('Error getting name:', error);
            return "";
        }
    }
}

export default UniversityQualifications;