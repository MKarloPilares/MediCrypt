import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './GetWhiteListedNamesButton.css';

//Type setting of inherited variables and functions
interface WhiteListButtonProps {
  tokenID: number | null;
  setWhiteListNames: React.Dispatch<React.SetStateAction<string[]>>;
  setWhiteListAddresses: React.Dispatch<React.SetStateAction<string[]>>
  openWhiteListModal: () => void;
}

//Button to get the whitelisted names and addresses of an NFT
const GetWhiteListedNamesButton: React.FC<WhiteListButtonProps> = ({ tokenID, setWhiteListNames, setWhiteListAddresses, openWhiteListModal }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const getWhiteListedNames = async () => {
    if (!provider) {
      alert('User is not connected to an Ethereum wallet.');
      return;
    }

    // Ensure tokenID and address are valid
    if (tokenID === null) {
      alert('Invalid tokenID.');
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
      // Call the getWhitelistAddressandNames function of the smart contract
      const result = await contract.getWhitelistedAddressesAndNames(tokenID);

      setWhiteListNames(result.names);
      setWhiteListAddresses(result.walletAddressess);

    } catch (error) {
      alert(`Error Getting Whitelist: ${error}`);
    }
  };

  return (
    <Button size='sm' variant="success" onClick={() => { getWhiteListedNames(); openWhiteListModal(); }} className="whitelist-button">
      UNSHARE
    </Button>
  );
};

export default GetWhiteListedNamesButton;
