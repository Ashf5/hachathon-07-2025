
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MainNavbar() {


    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Supreme Power Wash</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">About Us</Nav.Link>
            <Nav.Link href="#features">Contact</Nav.Link>
            <Nav.Link className='book' href="#pricing">Book</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )

}

export default MainNavbar;