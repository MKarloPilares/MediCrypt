import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';

//Type setting of inherited variables and functions
interface NewProviderButtonProps {
  address: string;
  providerName: string;
  setAddShow: () => void;
}

//Button to commit the addition of a new provider to the contract
const NewProviderButton: React.FC<NewProviderButtonProps> = ({ address, providerName, setAddShow }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const AddProvider = async () => {
    if (!provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    if (!address) {
      console.error('Invalid address.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

    // Retrieve the contract address from the environment variables

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call the whitelistAddress function of the smart contract
      await contract.addMedicalProvider(address, providerName);
      setAddShow();
    } catch (error) {
      console.error('Error Adding Medical Provider:', error);
    }
  };

  return (
    <Button variant='success' onClick={AddProvider}>
      Add Provider
    </Button>
  );
};

export default NewProviderButton;
