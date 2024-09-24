import React from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import './ConnectMetaMaskButton.css'; // Import the CSS file

interface ConnectMetaMaskButtonProps {
  setUserWalletAddress: (a: string) => void;
  setIsOwner: (a: boolean) => void;
  setIsMedicalProvider: (a: boolean) => void;
  className: string;
}

const ConnectMetaMaskButton: React.FC<ConnectMetaMaskButtonProps> = ({ setUserWalletAddress, setIsOwner, setIsMedicalProvider, className }) => {

  const connectMetamaskWallet = async () => {
    const provider = (window as any).ethereum;

    if (!provider) {
      // Detect if running on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Deep link to MetaMask mobile app and back to the dApp URL
        window.location.href = 'https://metamask.app.link/dapp/medicrypt.netlify.app';
      } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
      }
      return;
    }

    try {
      // Request the user's MetaMask accounts
      const accounts: string[] = await provider.request({ method: "eth_requestAccounts" });
      setUserWalletAddress(accounts[0]);

      // Create a new Web3 provider with ethers.js
      const web3Provider = new ethers.providers.Web3Provider(provider);

      // Check if the connected account is the contract owner or a medical provider
      checkContractOwner(web3Provider, accounts[0]);
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  };

  const checkContractOwner = async (web3Provider: ethers.providers.Web3Provider, account: string) => {
    if (!web3Provider) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = web3Provider.getSigner();

    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    // Check if the account is the contract owner
    if (account === (await contract.owner()).toLowerCase()) {
      setIsOwner(true);
    }

    // Check if the account is a registered medical provider
    if (await contract.isMedicalProvider(account)) {
      setIsMedicalProvider(true);
    }
  };

  return (
    <Button
      onClick={connectMetamaskWallet}
      variant="success"
      className={className}
    >
      Connect Metamask
    </Button>
  );
};

export default ConnectMetaMaskButton;
