import Web3 from 'web3';

class Web3ServerSingleton {
  constructor() {
    if (!Web3ServerSingleton.instance) {
      const provider = new Web3.providers.HttpProvider('https://rpc.sepolia.org');
      const web3 = new Web3(provider);
      Web3ServerSingleton.instance = web3;
    }
  }

  getInstance() {
    return Web3ServerSingleton.instance;
  }
}

const instance = new Web3ServerSingleton();
Object.freeze(instance);

export default instance;
