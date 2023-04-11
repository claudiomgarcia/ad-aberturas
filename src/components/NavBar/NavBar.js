import { Link, NavLink } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";
import logo from '../../logo.png';
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { useAuth } from '../../context/AuthContext'
import Button from 'react-bootstrap/esm/Button';

const NavBar = () => {
    const [categories, setCategories] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        const categoriesRef = query(collection(db, 'categories'), orderBy('order'))

        getDocs(categoriesRef)
            .then(snapshot => {
                const categoriesAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()

                    return { id: doc.id, ...data }
                })

                setCategories(categoriesAdapted)
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
                </Navbar.Collapse>
                {
                    user ? (
                    <CartWidget />
                    ) : (
                        <NavLink to='/login' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}><Button variant='success'>Login</Button></NavLink>
                    )
                }
            </Container>
        </Navbar >
    )
}

export default NavBar;