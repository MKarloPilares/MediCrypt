import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import MyAbi from './MyAbi.json';
import './MintButton.css';

//Type setting of inherited variables and functions
interface MintButtonProps {
  account: string | null;
  combinedData: any;
  tokenID: Number | null;
}

//Button to encrypt and upload a record then mint an NFT from it, or if the NFT already exists this button functions to reencrypt a record and edit the NFT's metadata
const MintButton: React.FC<MintButtonProps> = ({ account, combinedData, tokenID }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  //Imports environment variables
  const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;
  const pinataGatewayToken = import.meta.env.VITE_REACT_APP_GATEWAY_TOKEN;
  const JWT = import.meta.env.VITE_REACT_APP_JWT;
  const pinataGateway = import.meta.env.VITE_REACT_APP_GATEWAY;

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  useEffect(() => {
    if (combinedData) {
      console.log("combinedData is ready:", combinedData);
    }
  }, [combinedData]);  

    const extractHash = (url) => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    };

  const combineAndEncryptData = async () => {
    // Convert combined data to a JSON string
    const jsonString = JSON.stringify(combinedData);

    // Generate a random encryption key
    const encryptionKey = CryptoJS.lib.WordArray.random(16).toString(); // 16 bytes = 128 bits

    // Encrypt the JSON string using the encryption key
    const encryptedData = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();

    try {
      const blob = new Blob([encryptedData], { type: 'text/plain' });
      const file = new File([blob], 'encrypted.txt');
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });
      const resData = await res.json();
      const fileUrl = `${pinataGateway}/ipfs/${resData.IpfsHash}?pinataGatewayToken=${pinataGatewayToken}`;
      if (!provider) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

      // Create a signer from the user's Ethereum account
      const signer: Signer = provider.getSigner();

      // Connect to the contract using the ABI and address
      const contract = new ethers.Contract(contractAddress, MyAbi, signer);
      const paymentAmount = ethers.utils.parseEther("0.000038");
      
      try {
        //Mints a new NFT if it's a new record
        if (tokenID === null) {
          await contract.mint(account, fileUrl, combinedData.personalInfo.patientName, encryptionKey,{ value: paymentAmount } );
        } else {
          //If a record already exists the old content hash is unpinned and deleted from the IPFS
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
          await contract.editTokenMetadata(tokenID, fileUrl, combinedData.personalInfo.patientName, encryptionKey, { value: paymentAmount } );
          }
        }
       catch (error) {
        console.error('Error minting NFT:', error);
      }
    } catch (error) {
      console.error('Uploading to IPFS:', error);
  }
}
  return (
    <Button onClick={combineAndEncryptData} variant="warning" className="commit-record-button">
      Commit Record
    </Button>
  );
};

export default MintButton;
