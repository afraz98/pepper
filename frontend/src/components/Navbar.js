import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"



class NavigationBar extends Component {
    render() {    
        return (
            <div>
                <Navbar color="dark" dark="true">
                <NavbarBrand href="/"> Pepper <FontAwesomeIcon icon={faPepperHot}/></NavbarBrand>
                <Nav>
                    <NavItem><Button href="/issues" color="info">Issues</Button></NavItem>
                    <NavItem><Button href="/login" color="warning">Login</Button></NavItem>
                    <NavItem><Button href="/register" color="success">Register</Button></NavItem>
                </Nav>
            </Navbar>
            </div>
        );
    }
}

export default NavigationBar;