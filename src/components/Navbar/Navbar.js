import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        Kuka
                    </NavLink>

                    <NavLink to="/blogs" activeStyle>
                        Muistoja
                    </NavLink>

                    <NavLink to="/database" activeStyle>
                        Tietokanta
                    </NavLink>

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;