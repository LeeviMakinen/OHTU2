import {Nav, NavLink, NavMenu} from "./NavbarElements";
import {useState} from "react";

const Navbar = () => {
    //Onko menu kiinni vai ei?
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar">
            {/* Menupainike */}
            <div className={"container"}>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "Sulje" : "Valikko"}
            </button>
            </div>

            {/* Navbar for larger screens */}
            <Nav className={menuOpen ? "hidden" : ""}>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        Kuka
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                        Muistoja
                    </NavLink>
                    <NavLink to={"/kalenteri"} activeStyle>
                        Kalenteri
                    </NavLink>
                    <NavLink to={"/pelisali"} activeStyle>
                        Pelisali
                    </NavLink>
                </NavMenu>
            </Nav>

            {/* Menu for smaller screens */}
            <div className={`menu ${menuOpen ? "" : "hidden"}`}>
                <NavLink to="/about" activeStyle>
                    Kuka
                </NavLink>
                <NavLink to="/blogs" activeStyle>
                    Muistoja
                </NavLink>
                <NavLink to={"/kalenteri"} activeStyle>
                    Kalenteri
                </NavLink>
                <NavLink to={"/pelisali"} activeStyle>
                    Pelisali
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;