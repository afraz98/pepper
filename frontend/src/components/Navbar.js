import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/AuthContext";

import '../style/navbar.css'

const NavigationBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand className="navbar-brand"><Link className="navbar-link" to="/"><FontAwesomeIcon icon={faPepperHot}/></Link></Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            user ? (
                                <>
                                <Link className="navbar-link" to="/issues">Issues</Link>
                                <Link className="navbar-link" onClick={ logoutUser }>Logout</Link>
                                </>
                            ) : (
                                <>
                                <Link className="navbar-link" to="/issues">Issues</Link>
                                <Link className="navbar-link" to="/login"> Login </Link>
                                <Link className="navbar-link" to="/register">Register</Link>
                                </>
                            )
                        }
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 bg-dark text-white"
                            aria-label="Search"
                        />
                        <Button variant="outline-danger">Search</Button>
                    </Form>
            </Container>
        </Navbar>
        </>
    );
}

export default NavigationBar;