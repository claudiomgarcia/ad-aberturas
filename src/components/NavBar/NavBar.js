import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartWidget from "../CartWidget/CartWidget";
import logo from '../../logo.png';

const NavBar = () => {
    return (
        <header>
            <Navbar key={"expand"} expand={"md"} bg={"light"} variant={"light"} className="mb-3">
                <Container fluid>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <a href="/">
                        <img className="header__logo" src={logo} alt="Ad Aberturas" />
                    </a>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                AD Aberturas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3 gap-md-5">
                                <Nav.Link href="/">Inicio</Nav.Link>
                                <NavDropdown
                                    title="Productos"
                                    id={`offcanvasNavbarDropdown-expand-md`}
                                >
                                    <NavDropdown.Item href="/category/puertas">Puertas</NavDropdown.Item>
                                    <NavDropdown.Item href="/category/portones">Portones</NavDropdown.Item>
                                    <NavDropdown.Item href="/category/ventanas">Ventanas</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#">Contacto</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Brand href="#"><CartWidget /></Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar;