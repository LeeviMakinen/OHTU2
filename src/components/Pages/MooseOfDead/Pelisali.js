import React from "react";
import "../pages.css";
import hirvipaa from "./Kuvat/hirvipaa.png";
const About = () => {
    return (
        <div>
            <h1 className={"center"}>
               Tänne Moose of ded
            </h1>
            <img src={hirvipaa} alt={"Pähee logo veli"}/>

        </div>
    );
};

export default About;