import React from 'react';
import { Button } from 'react-bootstrap';
import './UploadToIPFSButton.css'

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkOGY1YTBhYi1lN2VjLTRiNTMtOTNmYy0xYmZkNzJiN2UzMTgiLCJlbWFpbCI6ImF6YXplbGwyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjgyODRhODI3MjQzYzk3ZDcwNmYiLCJzY29wZWRLZXlTZWNyZXQiOiI2NDJiMTI5MWM1YzliNzEzOGE2OGNiMDE4YzI3Nzk0OWYxYTcyNzg3OWE4ZDZiZjMyZDI3NjQ0ODM0NGQ5MDM2IiwiZXhwIjoxNzU0MDEyNzg1fQ.u81FAJn_dL_OuE2xdSz7bGrWM5f7m3KtZ7cmfwp5r70';

interface UploadToIPFSButtonProps {
  appendImageUri: (a) => void;
  ActionAfterAppend: () => void;
  file: any;
  className: string;
}

const UploadToIPFSButton: React.FC<UploadToIPFSButtonProps> = ({ appendImageUri, ActionAfterAppend, file, className}) => {
  
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
