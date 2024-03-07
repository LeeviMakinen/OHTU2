import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import Home from "./components/Pages";
import About from "./components/Pages/about";
import Blogs from "./components/Pages/blogs";
import Kalenteri from "./components/Pages/kalenteri";
import Pelisali from "./components/Pages/MooseOfDead/Pelisali";
import Rekisteri from "./components/Pages/register"
import Navbar2 from "./components/Navbar/NavbarPreLogin";
import Layout from "./components/Pages/layout";

import '../src/components/Pages/pages.css'
import videotausta from "./components/Pages/forestvideo2.mp4";



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

<div>
                <Router>
                    <Navbar2 classname={"navbar"} isLoggedIn={isLoggedIn} handleLogOut={handleLogOut}/>
                    <Routes>

                        {/* Always render the login route */}
                        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
                        <Route path="/register" element={<Rekisteri/>}/>
                        {/* Conditional rendering of other routes based on isLoggedIn */}
                        <Route path="*" element={isLoggedIn ? <AuthenticatedRoutes/> : <Navigate to="/login"/>}/>

                    </Routes>

                </Router>

</div>)

}

function AuthenticatedRoutes() {
    return (

        <div>


            <div className={"contentFront"}>


                <Navbar/>
                <Layout>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/blogs" element={<Blogs/>}/>
                        <Route path="/kalenteri" element={<Kalenteri/>}/>
                        <Route path="/pelisali" element={<Pelisali/>}/>
                        <Route path="/register" element={<Rekisteri/>}/>

                    </Routes>
                </Layout>


            </div>

            <div className={"contentBack"}>
                <video src={videotausta} autoPlay loop muted/>

            </div>
        </div>
    );
}

export default App;