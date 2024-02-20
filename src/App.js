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
import './styles.css';

function App({ LoggedInState }) {
    // State to track the login status
    const [isLoggedIn, setLoggedIn] = useState(() => {
        // Load the logged-in state from localStorage
        const loggedInState = localStorage.getItem("isLoggedIn");
        return loggedInState && loggedInState !== "undefined" ? JSON.parse(loggedInState) : false;
    });

    // Save the logged-in state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <Router>
            <Routes>
                {/* Always render the login route */}
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

                {/* Conditional rendering of other routes based on isLoggedIn */}
                <Route path="*" element={isLoggedIn ? <AuthenticatedRoutes /> : <Navigate to="/login" />} />


            </Routes>
        </Router>
    );
}

function AuthenticatedRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/database" element={<Database />} />
                <Route path="/kalenteri" element={<Kalenteri />} />
                <Route path="/pelisali" element={<Pelisali />} />
            </Routes>
        </>
    );
}

export default App;