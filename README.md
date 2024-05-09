# CS596 Final Project: University Qualifications

## Overview

Welcome to our final project for CS596! This repository contains two main components:

1. **Smart Contract**: A blockchain-based solution that enables universities to securely issue qualifications to their students.
2. **Website**: A user-friendly web interface to interact with the smart contract, where universities can add qualifications to students and everyone can look up the issued qualifications.

## Structure

- `smart-contract`: This folder contains the Solidity smart contract that allows universities to manage and issue qualifications. Right now the smart contract is deployed on the Sepolia testnet.
- `website`: This folder contains the frontend web interface that universities can use to interact with the smart contract. It's built using nextjs.

## Prerequisites

To work with this project, ensure you have the following installed:

- Node.js
- A web browser compatible with Web3 (such as Chrome with the MetaMask extension)

## Getting Started

1. Deploy the smart contract.
2. Navigate to the `website` folder.
3. Update the environment variables in `website/.env` with the new smart contract address.
4. If the ABI (Application Binary Interface) has changed after re-deploying the smart contract, update the ABI in the web application codebase accordingly.
5. Run `npm install` to install the dependencies.
6. Run `npm run dev` to start the development server.

## Usage

- **Unregistered Users**: View qualifications issued by universities for a specific address.
- **Universities**: They can issue qualifications to students and vote on new university candidates.
- **Students**: Can view qualifications issued by universities and link their name to their address. Also, they can apply to become a university.

## Contributors

- [Christian Matthaei](https://github.com/Chrissydrx)
- [Collin Bratzler](https://github.com/collinbratzler)
- [Nicolas Braun](https://github.com/NicolasKmbr)
