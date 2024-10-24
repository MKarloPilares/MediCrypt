import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './DeleteRecordButton.css';

//Type setting of inherited variables and functions
interface DeleteRecordButtonProps {
  tokenID: Number | null;
}

//Button to encrypt and upload a record then mint an NFT from it, or if the NFT already exists this button functions to reencrypt a record and edit the NFT's metadata
const MintButton: React.FC<DeleteRecordButtonProps> = ({ tokenID }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  //Imports environment variables
  const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;
  const JWT = import.meta.env.VITE_REACT_APP_JWT;

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);  

    const extractHash = (url) => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    };

  const deleteNFT = async () => {
      if (!provider) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

      // Create a signer from the user's Ethereum account
      const signer: Signer = provider.getSigner();

      // Connect to the contract using the ABI and address
      const contract = new ethers.Contract(contractAddress, MyAbi, signer);
      
      try {
          const record =  await contract.getTokenMetadata(tokenID);
          const hash = extractHash(record[0])
          try {
            await fetch(
              `https://api.pinata.cloud/pinning/unpin/${hash}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${JWT}`,
                },
              }
            );
          } catch (error) {
            console.log('Error deleting from IPFS: error');
          }
          //The NFT's metadata is editted with the new content hash and encryption key
          await contract.deleteNFT(tokenID);
          }
       catch (error) {
        console.error('Error minting NFT:', error);
      }
  }

  return (
    <Button onClick={deleteNFT} size='sm'  variant="success" className="button-delete-NFT">
      DELETE
    </Button>
  );
};

export default MintButton;
