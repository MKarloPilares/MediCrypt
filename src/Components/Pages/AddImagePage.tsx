import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ThemeProvider } from 'react-bootstrap';
import './AddImagePage.css';

const AddImagePage = ({appendImage, uploadImageToIPFS}) => {
  const [file, setFile] = useState<any>(null);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [file, description, date]);

  const checkFormValidity = () => {
    setIsFormValid(
      file !== null &&
      description !== '' &&
      date !== ''
    );
  };

  const resetForm = () => {
    setFile(null);
    setDescription('');
    setDate('');
  };

  return (
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Form className="form-container">
      <Row>
        <Col md='auto'>
          <Form.Group className='mb-3' controlId='diagnosisForm.ControlInput'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              className="input-file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
            />
          </Form.Group>
        </Col>
        <Col md='auto'>
          <Form.Group className='mb-3' controlId='prognosisForm.ControlInput'>
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
          <Form.Group className='mb-3' controlId='treatmentForm.ControlInput'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              placeholder='Date'
              value={date}
              className="input-date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button 
            variant='success' 
            disabled={!isFormValid} 
            className="button-add"
            onClick={() => {appendImage(description, date); uploadImageToIPFS("", file); resetForm()}}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  </ThemeProvider>
  );
};

export default AddImagePage;
