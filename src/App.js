import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./components/Pages";
import About from "./components/Pages/about";
import Blogs from "./components/Pages/blogs";
import Database from "./components/Pages/Database";

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
                />
            </Routes>
            </Layout>
        </Router>
    );
}

export default App;