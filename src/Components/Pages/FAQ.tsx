import { Accordion, Container } from "react-bootstrap";
import "./FAQ.css";

const FAQ = () => {
  return (
    <Container>
      <h2>Frequently Asked Questions</h2>
      <Accordion className="faq-container">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is MediCrypt?</Accordion.Header>
          <Accordion.Body>
            MediCrypt is a Blockchain-Powered Medical Record Management System that aims to decentralize records allowing patients to own their records
            and control access to them. This is done by turning records into NFTs and giving them to users. The decentralization also results in easier record sharing, meaning
            as the record allows it, other users anytime/anywhere can view records. The improved sharing can make hospital visits faster as it eliminates the need for hospitals to
            take and keep individual records for themselves. One record, all hospitals!
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Is MediCrypt Safe To Use?</Accordion.Header>
          <Accordion.Body>
            MediCrypt was made with privacy as its top priority and prides itself in its security. 
            Through the combination of decentralization, hashing, and encryption MediCrypt protects the sensitive data in the medical records kept in it.
            Decentralization breaks down the files into smaller sections which are stored in numerous devices around the world, meaning there is no single storage device making it much more difficult
            to breach and access even one record. Those broken down sections are then located through cryptic hashes which are hard to decode and need to be put together to access the entire record. 
            As it's last line of defense, the data within the records themselves are continously encrypted with every edit done to them, making security dynamic and ensuring protection from
            unwanted decryption.            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Does MediCrypt Cost Money?</Accordion.Header>
          <Accordion.Body>
            It does. Actions done that commits changes to the blockchain, such as creating, editting, and sharing records, requires a payment of miniscule amounts of ethereum for the blockchain
            to recorgnize the action. On top of this, MediCrypt also add small extra fee as payment for the service. However, signing up, owning, and viewing records are completely free. MediCrypt
            uses a Pay-As-You-Go model, meaning you are only charged when an action is committed to the chain.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>How Do I Setup A Metamask Account?</Accordion.Header>
          <Accordion.Body>
            In desktop or laptops Metamask is a browser extension installed through the browsers plugin/extension manager or store.
            For example, in Chrome:
            <ol>
              <li>You may go to <a href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank"> Metamask's chrome web store page</a></li>
              <li>Click the "Add to Chrome" button</li>
              <li>Wait for it to download and install</li>
              <li>Click create a new wallet if you need a new account or import existing wallet if you already have one</li>
              <li>Follow the onscreen instructions</li>
            </ol>
            <p></p>
            For mobile devices:
            <ol>
              <li>Find the Metamask application in the play store/app store</li>
              <li>Install the application</li>
              <li>Click create a new wallet if you need a new account or import existing wallet if you already have one</li>
              <li>Follow the onscreen instructions</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Where Can I Buy Ethereum?</Accordion.Header>
          <Accordion.Body>
            Users have two choices when buying Ethereum. You can either buy ethereum directly from Metamask or buy from another platform and transfer it to your Metamask wallet.
            Buying from metamask is fast and convenient but has a large varying minimum amount, this is recommended for large medical providers. Buying from another platform on the other hand
            will not have a minimum charge but transferring will incur a small gas fee.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Why Does it Say "VIEW MODE ONLY?"</Accordion.Header>
          <Accordion.Body>
            Normal users will see this as only medical providers listed in the MediCrypt's provider list can create or edit medical records. 
            This is done to prevent the creation of fraudulent records.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Can My Record Really Be Accessed Anywhere/Anytime?</Accordion.Header>
          <Accordion.Body>
            Absolutely! As long as the owner permits another user to access the record, then they can access it anytime and anywhere through the MediCrypt Web Application.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQ;
