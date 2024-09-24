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
    // Check if MetaMask is installed, if not, redirect to the MetaMask mobile app link
    if (typeof (window as any).ethereum === 'undefined') {
      window.open('https://metamask.app.link/', '_blank'); // Redirects to MetaMask mobile app
      return;
    }

    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserWalletAddress(accounts[0]);

      const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);

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

    if (account === (await contract.owner()).toLowerCase()){
      setIsOwner(true);
    }

    if (await contract.isMedicalProvider(account)){
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
