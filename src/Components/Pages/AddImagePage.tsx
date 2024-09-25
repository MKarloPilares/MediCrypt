import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import UploadToIPFSButton from '../Buttons/UploadToIPFSButton';
import './AddImagePage.css';

//Page that accepts file input for images related to the medical record
const AddImagePage = ({setPatientImages}) => {
  const [file, setFile] = useState<any>(null); //Variable that stores the file uploaded
  const [description, setDescription] = useState<string>(''); //A description for the file
  const [imageDate, setImageDate] = useState<string>(''); //Date of the file
  const [isFormValid, setIsFormValid] = useState(false); //Checks if the input is valid and controls if the upload button is visible

  //Function to check if the varaibles are not empty
  useEffect(() => {
    checkFormValidity();
  }, [file, description, imageDate]);

  const checkFormValidity = () => {
    setIsFormValid(
      file !== null &&
      description !== '' &&
      imageDate !== ''
    );
  };

  //Function to reset variables when the upload button is clicked
  const resetForm = () => {
    setFile(null);
    setDescription('');
    setImageDate('');
  };

  //Function to append the content hash from the IPFS to the record data.
  const appendImageUri = (link) => {
    setPatientImages(prevDetails => ({
      ...prevDetails,
      imageUri: [...prevDetails.imageUri, link],
    }))
  }

  //Funtion to clear the input controls after appending the details of the file.
  const appendDetailsAndClear = async () => {
    appendDetails(description, imageDate);
    resetForm();
};

  //Function to append the description and date of the file to the record data.
  const appendDetails = (newDesc, newDate) => {
    setPatientImages(prevDetails => ({
      ...prevDetails,
      description: [...prevDetails.description, newDesc],
      imageDate: [...prevDetails.imageDate, newDate],
    }));
  };

  return (
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Form className="form-container">
      <Row>
        <Col md='auto'>
          <Form.Group className='mb-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              className="input-file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
            />
          </Form.Group>
        </Col>
        <Col md='auto'>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder='Description'
              value={description}
              className="input-description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Date'
              value={imageDate}
              className="input-date"
              onChange={(e) => setImageDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          {isFormValid && 
            <UploadToIPFSButton  appendImageUri={appendImageUri} ActionAfterAppend={appendDetailsAndClear} file={file} className='addImagePage-button-upload'/>
          }
        </Col>
      </Row>
    </Form>
  </ThemeProvider>
  );
};

export default AddImagePage;
