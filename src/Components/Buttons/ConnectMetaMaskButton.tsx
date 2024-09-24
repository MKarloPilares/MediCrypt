import React from 'react';
import { ethers, Signer } from 'ethers';
import { Button } from 'react-bootstrap';
import MyAbi from './MyAbi.json';
import WalletConnectProvider from "@walletconnect/web3-provider"; // Import WalletConnect provider
import './ConnectMetaMaskButton.css'; // Import the CSS file

interface ConnectMetaMaskButtonProps {
  setUserWalletAddress: (a: string) => void;
  setIsOwner: (a: boolean) => void;
  setIsMedicalProvider: (a: boolean) => void;
  className: string;
}

// Helper function to check if the device is mobile
const isMobileDevice = () => {
  return /android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const ConnectMetaMaskButton: React.FC<ConnectMetaMaskButtonProps> = ({
  setUserWalletAddress,
  setIsOwner,
  setIsMedicalProvider,
  className
}) => {

  const connectWallet = async () => {
    // Detect if MetaMask is installed
    const isMetaMaskInstalled = typeof (window as any).ethereum !== 'undefined';

    if (!isMetaMaskInstalled) {
      if (isMobileDevice()) {
        // If on mobile, open WalletConnect
        const provider = new WalletConnectProvider({
          rpc: {
            1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Add your own RPC provider here
          },
          qrcodeModalOptions: {
            mobileLinks: ["metamask", "trust", "rainbow", "argent"],
          },
        });

        await provider.enable();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          setUserWalletAddress(accounts[0]);
          checkContractOwner(web3Provider, accounts[0]);
        }

      } else {
        // If on desktop, redirect to MetaMask's mobile app link
        window.open('https://metamask.app.link/', '_blank');
      }
      return;
    }

    // Handle MetaMask connection on desktop
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

    const signer: Signer = web3Provider.getSigner();
    const contractAddress = import.meta.env.VITE_REACT_APP_CONTRACT_ADDRESS;

    if (!contractAddress) {
      console.error('Contract address is not defined.');
      return;
    }

    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    if (account === (await contract.owner()).toLowerCase()) {
      setIsOwner(true);
    }

    if (await contract.isMedicalProvider(account)) {
      setIsMedicalProvider(true);
    }
  };

  return (
    <Button
      onClick={connectWallet}
      variant="success"
      className={className}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectMetaMaskButton;
