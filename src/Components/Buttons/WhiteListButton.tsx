import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';

//Type setting of inherited variables and functions
interface WhiteListButtonProps {
  walletAddress: string;
  tokenID: number | null;
  name: string;
  nftName: string
  setAddShow: () => void;
}

//Button to whitelist an address for an NFT
const WhiteListButton: React.FC<WhiteListButtonProps> = ({ walletAddress, tokenID, name, nftName, setAddShow }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const WhiteListAddress = async () => {
    if (!provider) {
      alert('User is not connected to an Ethereum wallet.');
      return;
    }

    // Ensure tokenID and address are valid
    if (tokenID === null) {
      alert('Invalid tokenID.');
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
      // Call the whitelistAddress function of the smart contract
      await contract.whitelistAddress(tokenID, walletAddress, name, nftName);
      setAddShow();
    } catch (error) {
      alert(`Error whitelisting address: ${error}`);
    }
  };

  return (
    <Button variant='success' onClick={WhiteListAddress}>
      Give Access
    </Button>
  );
};

export default WhiteListButton;
