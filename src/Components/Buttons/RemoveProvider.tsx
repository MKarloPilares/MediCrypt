import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './RemoveProvider.css'; // Import the CSS file

//Type setting of inherited variables and functions
interface RemoveProviderButtonProps {
  address: string;
}

//Button to remove a provider from the smart contract
const RemoveProviderButton: React.FC<RemoveProviderButtonProps> = ({ address }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const removeProvider = async () => {
    if (!provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

    // Retrieve the contract address from the environment variables

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call the removeMedicalProvider function of the smart contract
      await contract.removeMedicalProvider(address);

    } catch (error) {
      console.error('Error Removing Provider:', error);
    }
  };

  return (
    <Button size='sm' variant="success" onClick={removeProvider} className="removeProvider-button">
      REMOVE
    </Button>
  );
};

export default RemoveProviderButton;
