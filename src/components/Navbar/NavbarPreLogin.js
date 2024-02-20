import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";


const Navbar2 = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/login" activeStyle>
                        Kirjaudu
                    </NavLink>



                    <NavLink to={"/register"} activeStyle>
                        Rekisteröidy
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar2;