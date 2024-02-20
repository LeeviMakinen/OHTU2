// Import necessary dependencies and components
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login"; // Adjust the path as needed
import Home from "./components/Pages";
import About from "./components/Pages/about";
import Blogs from "./components/Pages/blogs";
import Database from "./components/Pages/Database";
import Kalenteri from "./components/Pages/kalenteri";
import Pelisali from "./components/Pages/Pelisali";

import Layout from "./components/Pages/layout";
import './styles.css'







function App() {
    // State to track the login status
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Use a conditional route for the login page */}
                <Route
                    path="/login"
                    element={<Login setLoggedIn={setLoggedIn} />}
                />

                {/* Use a conditional route for other pages */}
                {isLoggedIn ? (
                    // Routes accessible after successful login
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/database" element={<Database />} />
                        <Route path="/kalenteri" element={<Kalenteri />} />
                        <Route path="/pelisali" element={<Pelisali />} />
                    </>
                ) : (
                    // Render the login page content conditionally
                    <Route to="/login" />
                )}
            </Routes>
        </Router>
    );
}




export default App;