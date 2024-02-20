// Filename - pages/blogs.js

import React from "react";
import MrGeen from "./mrgreen.png";
import './pages.css';


const Blogs = () => {
    return(

    <div className={"body"}>
        <h1>Tälle sivulle vissii metästystarinointia</h1>

        <img  className={"img2"} src={MrGeen} alt={"Turvallinen ja reilu MR GREEN!11"}/>

    </div>
    )
};

export default Blogs;
