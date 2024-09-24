import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import MyAbi from './MyAbi.json';
import { useNavigate } from 'react-router-dom';
import './GetRecordFromContractButton.css'

interface GetRecordFromContractButtonProps {
  tokenID: number;
  className: string;
  updateCombinedData: (a) => void;
  setTokenID: (a) => void;
 }

const GetRecordFromContractButton: React.FC<GetRecordFromContractButtonProps> = ({ tokenID, className, updateCombinedData, setTokenID}) => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);


  const getRecordFromContract = async () => {
    if (!provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    const signer: Signer = provider.getSigner();
    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, MyAbi, signer);

      const record = await contract.getTokenMetadata(tokenID);
      const fileUrl = record[0];
      const fileRes = await fetch(fileUrl);
      const fileContent = await fileRes.text();

      const bytes = CryptoJS.AES.decrypt(fileContent, record[2]);

      // Convert the decrypted bytes back to a JSON string
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    
      // Parse the JSON string back into an object
      const decryptedData = JSON.parse(decryptedJsonString);
    
      setTokenID(tokenID)
      updateCombinedData(decryptedData)

      navigate("/Profile");


    } catch (error) {
      console.error('Error Getting Record:', error);
    }
  };

  return (
    <Button onClick={getRecordFromContract} variant="success" size='sm' className={className}>
      OPEN
    </Button>
  );
};

export default GetRecordFromContractButton;
