import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import './RemoveFromWhiteListButton.css'
import MyAbi from './MyAbi.json';

//Type setting of inherited variables and functions
interface RemoveFromWhiteListButtonProps {
  tokenID: number;
  walletAddress: string;
  nftName: string;
  setWhiteListModalShow: () => void;
}

//Button to remove an address from an NFT's whitelist
const RemoveFromWhiteListButton: React.FC<RemoveFromWhiteListButtonProps> = ({ tokenID, walletAddress, nftName, setWhiteListModalShow }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const removeFromWhiteList = async () => {
    if (!provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Ensure tokenID and address are valid
    if (tokenID === null) {
      console.error('Invalid tokenID.');
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
      // Call the removeWhitelistedAddress function of the smart contract
      await contract.removeWhitelistedAddress(tokenID, walletAddress, nftName);
      setWhiteListModalShow();
    } catch (error) {
      console.error('Error whitelisting address:', error);
    }
  };

  return (
    <Button size="sm" variant="success" onClick={removeFromWhiteList} className='recordList-button-removeWhiteList'>
      REMOVE
    </Button>
  );
};

export default RemoveFromWhiteListButton;
