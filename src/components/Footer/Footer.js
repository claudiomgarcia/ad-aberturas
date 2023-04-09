import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from 'react-router-dom'



function Footer() {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom">
            <Container className="justify-content-center">
                <Nav>
                    <Link to='https://github.com/claudiomgarcia' target="_blank" className='nav-link'>&copy; 2023 - Claudio M. Garcia</Link>
                </Nav>
            </Container>
        </Navbar >
    );
}

export default Footer;