
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'


function MainNavbar() {


    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'>Supreme Power Wash</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">About Us</Nav.Link>
            <Nav.Link href="#features">Contact</Nav.Link>
            <Nav.Link as={Link} className='book' to="/book">Book</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )

}

export default MainNavbar;