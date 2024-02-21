import React, {useState} from "react";
import "../pages.css";
import hirvipaa from "./Kuvat/hirvipaa.png";
import Slot1 from "./Kuvat/Slot1.png"
import Slot2 from "./Kuvat/Slot2.png"
import Slot3 from "./Kuvat/Slot3.png"
import Slot4 from "./Kuvat/Slot4.png"
import Slot5 from "./Kuvat/Slot5.png"
import Slot6 from "./Kuvat/Slot6.png"
import Slot7 from "./Kuvat/Slot7.png"
import BigWin1 from "./Kuvat/BigWin1.png"
import BigWin2 from "./Kuvat/BigWin2.png"
import BigWin3 from "./Kuvat/BigWin3.png"


const Ikonit = () => {
    const slot1 = {
        name:1,
        slotImage: <img src={Slot1} alt={"slot1"} width={120} height={120}/>,
    };
    const slot2 = {
        name:2,
        slotImage: <img src={Slot2} alt={"slot1"} width={120} height={120}/>,
    };
    const slot3 = {
        name:3,
        slotImage: <img src={Slot3} alt={"slot1"} width={120} height={120}/>,
    };
    const slot4 = {
        name:4,
        slotImage: <img src={Slot4} alt={"slot1"} width={120} height={120}/>,
    };
    const slot5 = {
        name:5,
        slotImage: <img src={Slot5} alt={"slot1"} width={120} height={120}/>,
    };
    const slot6 = {
        name:6,
        slotImage: <img src={Slot6} alt={"slot1"} width={120} height={120}/>,
    };
    const slot7 = {
        name:7,
        slotImage: <img src={Slot7} alt={"slot1"} width={120} height={120}/>,
    };
    return (
        null

    );
};

const Toiminnallisuus = () => {

    const [arvot1,setArvot1] = useState([0,0,0,0,0])
    const [arvot2,setArvot2] = useState([0,0,0,0,0])
    const [arvot3,setArvot3] = useState([0,0,0,0,0])

    function randomit(min,max){
        const minimi = Math.ceil(min);
        const maximi = Math.floor(max);
        return Math.floor(Math.random() * (maximi - minimi + 1) + minimi);
    }

    function spinni(){
        setArvot1([randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7)])
        setArvot2([randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7)])
        setArvot3([randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7),randomit(1,7)])

    }

    return(
        <div>
            <ul>
                <li>{arvot1}</li>
                <li>{arvot2}</li>
                <li>{arvot3}</li>
            </ul>

            <button onClick={spinni}> SPIN AND WIN</button>
        </div>

    )
}


const About = () => {


    return (
        <div>
            <h1 className={"center"}>
                Hunter Hank's Moose of Dead
                <Toiminnallisuus/>
            </h1>
        </div>
    );
};

export default About;