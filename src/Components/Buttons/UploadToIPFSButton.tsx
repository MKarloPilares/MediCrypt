import React from 'react';
import { Button } from 'react-bootstrap';
import './UploadToIPFSButton.css'


interface UploadToIPFSButtonProps {
  appendImageUri: (a) => void;
  ActionAfterAppend: () => void;
  file: any;
  className: string;
}

const UploadToIPFSButton: React.FC<UploadToIPFSButtonProps> = ({ appendImageUri, ActionAfterAppend, file, className}) => {

  const JWT = import.meta.env.VITE_REACT_APP_JWT;
  
  const uploadImageToIPFS = async () => {

    try {
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
      
      appendImageUri(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      ActionAfterAppend();
      
    } catch (error) {
      console.log(error);
    } 
  }
  

  return (
    <Button variant={className === 'sidebar-button-upload' ? 'warning' : 'success'} onClick={uploadImageToIPFS} className={className}>
      Upload
    </Button>
  );
};

export default UploadToIPFSButton;
