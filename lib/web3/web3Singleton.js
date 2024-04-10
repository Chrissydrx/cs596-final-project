import Web3 from 'web3';

class Web3Singleton {
  constructor() {
    if (!Web3Singleton.instance) {
      const provider = new Web3.providers.HttpProvider('https://rpc.sepolia.org');
      const web3 = new Web3(provider);
      Web3Singleton.instance = web3;
    }
  }

  getInstance() {
    return Web3Singleton.instance;
  }
}

const instance = new Web3Singleton();
Object.freeze(instance);

export default instance;
