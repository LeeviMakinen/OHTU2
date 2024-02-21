import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import "../Pages/pages.css";


const Navbar2 = ({ isLoggedIn, handleLogOut }) => {



    return (
        <>
            <Nav>
                <NavMenu>
                    {isLoggedIn ? (
                        <button className={"navButton"} onClick={handleLogOut}>Kirjaudu ulos</button>
                    ) : (
                        <>
                            <NavLink to="/login" activeStyle>
                                Kirjaudu
                            </NavLink>
                            <NavLink to={"/register"} activeStyle>
                                Rekisteröidy
                            </NavLink>
                        </>
                    )}
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar2;