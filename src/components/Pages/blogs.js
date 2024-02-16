// Filename - pages/blogs.js

import React from "react";
import MrGeen from "./mrgreen.png";
import './pages.css';


const Blogs = () => {
    return(

    <div className={"body"}>
        <h1>Tälle sivulle vissii metästystarinointia</h1>;

        <img src={MrGeen} alt={"Turvallinen ja reilu MR GREEN!11"} className={"center"}/>

    </div>
    )
};

export default Blogs;
