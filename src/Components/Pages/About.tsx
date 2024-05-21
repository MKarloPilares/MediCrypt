
import {  Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from 'react-bootstrap';


const About = () => {
  return (

    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container>
      <Card>
        <Card.Body>
          <Card.Title style={{fontSize: '40px'}}>About MediCrypt</Card.Title>
          <Card.Text style={{fontSize: '30px'}}>
            MediCrypt is a Decentralized Application (dApp) designed to trivialize medical record keeping
            and sharing among medical facilities in the Philippines. It uses blockchain technology to
            store medical records without the need of a database or data silo.  The blockchain and MediCrypt's
            specialized smart contract were made with the intent of facilitating the sharing of medical records with minimal hassle.
            This removes the current process of requesting for physical records, as well as improving data integrity as it reduces the need
            to remake records. Lastly, the decentralized and encrypted nature of blockchain ensures that data is secured and that the patient owns
            the records not the medical facility.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  </ThemeProvider>
  );
};

export default About;
