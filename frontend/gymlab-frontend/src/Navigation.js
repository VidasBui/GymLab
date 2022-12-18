import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import {Nav} from 'react-bootstrap';
import Cookies from 'js-cookie'

export class Navigation extends Component{

    render()
    {

        const logoutUser = () => {
            Cookies.remove("token", {path: '' });
            window.location.href = "/home";
        }

        return(
        <NavBar bg="dark" expand="lg">
            <NavBar.Toggle aria-controls="basic-navbar-nav"/>
            <NavBar.Collapse id="basic-navbar-nav">
            <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white text-decoration-none" to="/home">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white text-decoration-none" to="/category">
                    Categories
                </NavLink>
                {Cookies.get("token", {path: '' }) === undefined ? <><NavLink className="d-inline p-2 bg-dark text-white text-decoration-none" to="/register">
                    Register
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white text-decoration-none" to="/login">
                    Login
                </NavLink></>:
                <NavLink onClick = {() => {logoutUser()}} className="d-inline p-2 bg-dark text-white text-decoration-none">
                    Logout
                </NavLink>}
                </Nav>
                </NavBar.Collapse>
        </NavBar>
        )
    }
}