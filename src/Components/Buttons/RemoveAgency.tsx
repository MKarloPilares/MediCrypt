import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './RemoveProvider.css';

//Type setting of inherited variables and functions
interface RemoveAgencyButtonProps {
  walletAddress: string;
}

//Button to remove an agency from the smart contract
const RemoveAgencyButton: React.FC<RemoveAgencyButtonProps> = ({ walletAddress }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const removeAgency = async () => {
    if (!provider) {
      alert('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

    // Retrieve the contract address from the environment variables

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call the removeAgency function of the smart contract
      await contract.removeAgency(walletAddress);

    } catch (error) {
      alert(`Error Removing Agency: ${error}`);
    }
  };

  return (
    <Button size='sm' variant="success" onClick={removeAgency} className="removeProvider-button">
      REMOVE
    </Button>
  );
};

export default RemoveAgencyButton;
