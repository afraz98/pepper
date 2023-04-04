import React, { useContext } from "react";
import { Nav, Navbar, Form, Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/AuthContext";

import '../style/navbar.css'

const NavigationBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <>
            <Navbar className="navbar mx-3">
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
                <Navbar.Collapse className="d-flex col-md-6 mx-auto px-auto justify-content-center">
                    <Form>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="bg-dark text-white"
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavigationBar;