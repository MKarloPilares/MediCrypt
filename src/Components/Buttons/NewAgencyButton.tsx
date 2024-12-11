import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';

//Type setting of inherited variables and functions
interface NewAgencyButtonProps {
  walletAddress: string;
  name: string;
  setAddShow: () => void;
}

//Button to commit the addition of a new agency to the contract
const NewAgencyButton: React.FC<NewAgencyButtonProps> = ({ walletAddress, name, setAddShow }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const AddAgency = async () => {
    if (!provider) {
      alert('User is not connected to an Ethereum wallet.');
      return;
    }

    if (!walletAddress) {
      alert('Invalid address.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

    // Retrieve the contract address from the environment variables

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      alert('Contract address is not defined.');
      return;
    }

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call the addAgency function of the smart contract
      await contract.addAgency(walletAddress, name);
      setAddShow();
    } catch (error) {
      alert(`Error Adding Medical Agency: ${error}`);
    }
  };

  return (
    <Button variant='success' onClick={AddAgency}>
      Add Agency
    </Button>
  );
};

export default NewAgencyButton;
