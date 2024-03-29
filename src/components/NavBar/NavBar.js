import { Link, NavLink } from 'react-router-dom'
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import CartWidget from "../CartWidget/CartWidget";
import logo from '../../logo.png';
import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext'
import { getCategories } from '../../services/firebase/firestore/categories';

const NavBar = () => {
    const [categories, setCategories] = useState([])
    const { user, logout } = useAuth()

    useEffect(() => {
        getCategories()
            .then(categories => {
                setCategories(categories)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand>
                    <Link to='/'><img className="header__logo" src={logo} alt="Ad Aberturas" /></Link>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-center flex-grow-1 pe-3 gap-md-5">
                        <NavLink to='/' className='nav-link'>Inicio</NavLink>
                        {
                            categories.map(cat => {
                                return (
                                    <NavLink to={`/category/${cat.slug}`} key={cat.id} className='nav-link'>{cat.label}</NavLink>
                                )
                            })
                        }
                    </Nav>
                    {
                    user &&(
                        <div className="mb-1">
                            <Link to='/myorders'><Button variant="secondary" size="" className="me-1">Mis pedidos</Button></Link>
                            <Button variant="secondary" size="" className="me-1" onClick={logout}>Logout</Button>
                        </div>)
                    }
                </Navbar.Collapse>
                {
                    user ? (
                        <div className="mb-1">
                            <CartWidget />
                        </div>
                    ) : (
                        <NavLink to='/login' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}><Button variant='success' className="mb-1">Login</Button></NavLink>
                    )
                }
            </Container>
        </Navbar >
    )
}

export default NavBar;