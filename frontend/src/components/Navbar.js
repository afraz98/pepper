import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/AuthContext";


const NavigationBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand className="text-white" href="/"> Pepper <FontAwesomeIcon icon={faPepperHot}/> </Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            user ? (
                                <>
                                <Nav.Link className="text-white" href="/issues">Issues</Nav.Link>
                                <Nav.Link className="text-white" onClick={ logoutUser }>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                <Nav.Link className="text-white" href="/issues">Issues</Nav.Link>
                                <Nav.Link className="text-white" href="/login"> Login </Nav.Link>
                                <Nav.Link className="text-white" href="/register">Register</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default NavigationBar;