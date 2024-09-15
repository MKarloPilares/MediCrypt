import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import UploadToIPFSButton from '../Buttons/UploadToIPFSButton';
import './AddImagePage.css';

const AddImagePage = ({setPatientImages}) => {
  const [file, setFile] = useState<any>(null);
  const [description, setDescription] = useState<string>('');
  const [imageDate, setImageDate] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

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

  const resetForm = () => {
    setFile(null);
    setDescription('');
    setImageDate('');
  };

  const appendImageUri = (link) => {
    setPatientImages(prevDetails => ({
      ...prevDetails,
      imageUri: [...prevDetails.imageUri, link],
    }))
  }

  const appendDetailsAndClear = async () => {
    appendDetails(description, imageDate);
    resetForm();
};

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
