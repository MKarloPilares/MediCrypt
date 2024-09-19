import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import MyAbi from './MyAbi.json';
import './MintButton.css'; // Import the CSS file

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkOGY1YTBhYi1lN2VjLTRiNTMtOTNmYy0xYmZkNzJiN2UzMTgiLCJlbWFpbCI6ImF6YXplbGwyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjgyODRhODI3MjQzYzk3ZDcwNmYiLCJzY29wZWRLZXlTZWNyZXQiOiI2NDJiMTI5MWM1YzliNzEzOGE2OGNiMDE4YzI3Nzk0OWYxYTcyNzg3OWE4ZDZiZjMyZDI3NjQ0ODM0NGQ5MDM2IiwiZXhwIjoxNzU0MDEyNzg1fQ.u81FAJn_dL_OuE2xdSz7bGrWM5f7m3KtZ7cmfwp5r70';

interface MintButtonProps {
  account: string | null; // User's Ethereum account
  combinedData: any;
  tokenID: Number | null;
}

const MintButton: React.FC<MintButtonProps> = ({ account, combinedData, tokenID }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

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
      const fileUrl = `https://ipfs.io/ipfs/${resData.IpfsHash}`;
      if (!provider) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

      // Create a signer from the user's Ethereum account
      const signer: Signer = provider.getSigner();

      const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

      // Connect to the contract using the ABI and address
      const contract = new ethers.Contract(contractAddress, MyAbi, signer);
      
      try {
        if (tokenID === null) {
          console.log (account)
          console.log (fileUrl)
          console.log (combinedData.personalInfo.patientName)
          console.log (encryptionKey)
          await contract.mint(account, fileUrl, combinedData.personalInfo.patientName, encryptionKey);
        } else {
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
        }
          await contract.editTokenMetadata(tokenID, fileUrl, combinedData.personalInfo.patientName, encryptionKey);
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
