import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/Pages/login";
import Home from "./components/Pages";
import About from "./components/Pages/about";
import Blogs from "./components/Pages/blogs";
import Database from "./components/Pages/Database";
import Kalenteri from "./components/Pages/kalenteri";

import Layout from "./components/Pages/layout";
import './styles.css'






function App() {
    return (
        <Router>

            <Navbar />
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/database" element={<Database />} />
                    <Route path="/kalenteri" element={<Kalenteri />} />
                    <Route path="/login" element={<Login />} />
                    />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;