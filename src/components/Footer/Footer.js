import  { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='pt-5'>
            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Container className="justify-content-center">
                    <Nav>
                        <Link to='https://github.com/claudiomgarcia' target="_blank" className='nav-link'>&copy; 2023 - Claudio M. Garcia</Link>
                    </Nav>
                </Container>
            </Navbar >
        </div>
    );
}

export default Footer;