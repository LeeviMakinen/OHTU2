import React from "react";
import "./pages.css";
import kuva from "./pojat.PNG";

const About = () => {
    return (
        <div>
            <h1>
                Pojat on hirvimetälle lähtenä
            </h1>
            <img src={kuva} alt={""}/>
        </div>
    );
};

export default About;