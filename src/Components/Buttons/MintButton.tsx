import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import MyAbi from './MyAbi.json';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkOGY1YTBhYi1lN2VjLTRiNTMtOTNmYy0xYmZkNzJiN2UzMTgiLCJlbWFpbCI6ImF6YXplbGwyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWI3MGEzYTBkNThhNjU0ZTA1ODgiLCJzY29wZWRLZXlTZWNyZXQiOiI0MzAxMGYxZWNlODk1ZDJkMTQ1MjFkNmQzNGJkMmNlNDFmMDg5ZmM4ZWQ1ZGFlMWUyMjIwZTU3NTczZWQ2YzlkIiwiZXhwIjoxNzUzMTU5OTkyfQ.Meyzh7TmWi5816v-OTORWTfq86kHl0O8l3jwhdLW5O8';

interface MintButton {
  account: string | null; // User's Ethereum account
  combinedData: any
  tokenID: Number | null;
}

const MintButton: React.FC<MintButton> = ({ account, combinedData, tokenID }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const  combineAndEncryptData = async () => {

    // Convert combined data to a JSON string
    const jsonString = JSON.stringify(combinedData);
  
    // Generate a random encryption key
    const encryptionKey = CryptoJS.lib.WordArray.random(16).toString(); // 16 bytes = 128 bits
  
    // Encrypt the JSON string using the encryption key
    const encryptedData = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();

    try {
      const blob = new Blob([encryptedData], { type: "text/plain" });
      const file = new File([blob], "encrypted.txt")
      const data = new FormData();
      data.append("file", file);
  
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });
      const resData = await res.json();
      console.log(resData);
      const fileUrl = `https://ipfs.io/ipfs/${resData.IpfsHash}`;
      const fileRes = await fetch(fileUrl);
      const fileContent = await fileRes.text();
      console.log("File contents:", fileContent);

      const bytes = CryptoJS.AES.decrypt(fileContent, encryptionKey);
  
      // Convert the decrypted bytes back to a JSON string
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    
      // Parse the JSON string back into an object
      const decryptedData = JSON.parse(decryptedJsonString);
    
      console.log(decryptedData.personalInfo.name)
      if (!provider || !account) {
        console.error('User is not connected to an Ethereum wallet.');
        return;
      }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      if (tokenID === null) {
        console.log(tokenID)
      // Call the stakeTokens function of smart contract
        await contract.mint(account, fileUrl, combinedData.personalInfo.name, encryptionKey);
      }
      else {
        await contract.editTokenMetadata(tokenID, fileUrl, combinedData.personalInfo.name, encryptionKey)
      }

    } catch (error) {
      console.error('Error minting NFT:', error);
    }

    } catch (error) {
      console.log(error);
    }

  };
  

  return (
    <Button onClick={combineAndEncryptData} variant='warning' style={{position: 'fixed', left: '6vw', top: '90vh'}}>
      Commit Record
    </Button>
  );
};

export default MintButton;