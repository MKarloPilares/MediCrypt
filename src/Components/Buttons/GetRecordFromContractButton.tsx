import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import MyAbi from './MyAbi.json';
import { useNavigate } from 'react-router-dom';
import './GetRecordFromContractButton.css'

//Type setting of inherited variables and functions
interface GetRecordFromContractButtonProps {
  tokenID: number;
  className: string;
  updateMedicalRecord: (a) => void;
  setTokenID: (a) => void;
 }

//Button to get an NFT's metadata from the contract and fetch the corresponding record from the IPFS
const GetRecordFromContractButton: React.FC<GetRecordFromContractButtonProps> = ({ tokenID, className, updateMedicalRecord, setTokenID}) => {
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

    const signer: Signer = provider.getSigner(); //Gets and stores the user's signature(private key) from metamask
    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS; //Imports the smart contract's address from env variables


    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, MyAbi, signer);

      const record = await contract.getTokenMetadata(tokenID); //Calls the getTokenMetadata function of the contract
      const fileUrl = record[0]; //Gets the url from the metadata
      const fileRes = await fetch(fileUrl); //Fetches encrypted file from the IPFS
      const fileContent = await fileRes.text(); //Encodes the contents to text

      const bytes = CryptoJS.AES.decrypt(fileContent, record[2]); //Decrypts the content using the key from the metadata

      // Convert the decrypted bytes back to a JSON string
      const decryptedJsonString = bytes.toString(CryptoJS.enc.Utf8);
    
      // Parse the JSON string back into an object
      const decryptedData = JSON.parse(decryptedJsonString);
    
      setTokenID(tokenID) 
      updateMedicalRecord(decryptedData)

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
