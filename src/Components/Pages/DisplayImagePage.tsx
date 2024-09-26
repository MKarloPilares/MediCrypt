import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DisplayImagePage.css';
import { Row, Col, ThemeProvider, Image, Form, Modal } from 'react-bootstrap';

const ImagePage = ({ patientImages }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ imageUri: '', description: '', imageDate: '' });

  const handleShowModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const entries = patientImages.imageUri.map((_, index) => ({
    imageUri: patientImages.imageUri[index],
    description: patientImages.description[index],
    imageDate: patientImages.imageDate[index],
  }));

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Form className="image-page-form">
        <Row>
          {entries.map((item, index) => (
            <Col key={index} className="image-page-col">
              <Form className="image-page-inner-form">
                <Row>
                  <Col md="auto">
                    <Form.Label>{item.description}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label>{item.imageDate}</Form.Label>
                  </Col>
                </Row>
                <Image
                  src={item.imageUri}
                  className="image-page-image"
                  onClick={() => handleShowModal(item)}
                  style={{ cursor: 'pointer' }}
                />
              </Form>
            </Col>
          ))}
        </Row>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedImage.imageUri} fluid />
          <p>Date: {selectedImage.imageDate}</p>
        </Modal.Body>
      </Modal>
    </ThemeProvider>
  );
};

export default ImagePage;
