import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import Home from "./components/Pages";
import About from "./components/Pages/about";
import Blogs from "./components/Pages/blogs";
import Database from "./components/Pages/Database";
import Kalenteri from "./components/Pages/kalenteri";
import Pelisali from "./components/Pages/MooseOfDead/Pelisali";
import Rekisteri from "./components/Pages/register"
import './styles.css';
import Navbar2 from "./components/Navbar/NavbarPreLogin";
import Layout from "./components/Pages/layout";



function App({ LoggedInState }) {
    // State to track the login status
    let [isLoggedIn, setLoggedIn] = useState(() => {
        // Load the logged-in state from localStorage
        const loggedInState = localStorage.getItem("isLoggedIn");
        return loggedInState && loggedInState !== "undefined" ? JSON.parse(loggedInState) : false;
    });

    // Save the logged-in state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    function handleLogOut(){

        setLoggedIn(false);

    }

    return (

        <Router>

            <Navbar2 isLoggedIn={isLoggedIn} handleLogOut={handleLogOut}/>
            <Routes>

                {/* Always render the login route */}
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
                <Route path="/register" element={<Rekisteri/>}/>
                {/* Conditional rendering of other routes based on isLoggedIn */}
                <Route path="*" element={isLoggedIn ? <AuthenticatedRoutes/> : <Navigate to="/login"/>}/>


            </Routes>

        </Router>

    );
}

function AuthenticatedRoutes() {
    return (
        <>
            <Navbar />
            <Layout>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/database" element={<Database />} />
                <Route path="/kalenteri" element={<Kalenteri />} />
                <Route path="/pelisali" element={<Pelisali />} />
                <Route path="/register" element={<Rekisteri />} />

            </Routes>
            </Layout>
        </>
    );
}

export default App;