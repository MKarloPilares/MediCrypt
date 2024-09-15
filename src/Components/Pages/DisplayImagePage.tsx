import 'bootstrap/dist/css/bootstrap.min.css';
import './DisplayImagePage.css';
import { Row, Col, ThemeProvider, Image, Form } from 'react-bootstrap';

const ImagePage = ({ patientImages }) => {
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
                <Image src={item.imageUri} className="image-page-image"></Image>
              </Form>
            </Col>
          ))}
        </Row>
      </Form>
    </ThemeProvider>
  );
};

export default ImagePage;
