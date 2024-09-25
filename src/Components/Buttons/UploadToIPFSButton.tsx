import React from 'react';
import { Button } from 'react-bootstrap';
import './UploadToIPFSButton.css'

//Type setting of inherited variables and functions
interface UploadToIPFSButtonProps {
  appendImageUri: (a) => void;
  ActionAfterAppend: () => void;
  file: any;
  className: string;
}

//Button to upload an image to the IPFS
const UploadToIPFSButton: React.FC<UploadToIPFSButtonProps> = ({ appendImageUri, ActionAfterAppend, file, className}) => {

  //Imports env variables
  const JWT = import.meta.env.VITE_REACT_APP_JWT;
  const pinataGatewayToken = import.meta.env.VITE_REACT_APP_GATEWAY_TOKEN;
  const pinataGateway = import.meta.env.VITE_REACT_APP_GATEWAY;
  
  const uploadImageToIPFS = async () => {

    try {
      const data = new FormData();
      data.append("file", file);

      //Pins the file to avoid deletion
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });
      const resData = await res.json();
      
      //Appends the content hash to the ImageUri or profile picture url of the personal info
      appendImageUri(`${pinataGateway}/ipfs/${resData.IpfsHash}?pinataGatewayToken=${pinataGatewayToken}`);
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
