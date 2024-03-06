import React, {useState, useEffect} from "react";
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
import Scatter from "./Kuvat/SCATTER.png"
import Theme from "./Äänet/theme.wav"
import Lataus from "./Äänet/Lataus.mp3"
import Pyssy from "./Äänet/Pyssy.mp3"



const Toiminnallisuus = () => {

    //Äänet
    const lataus= new Audio(Lataus)
    const theme = new Audio(Theme)
    const pyssy = new Audio(Pyssy)

    //Slotit
    const slot1 = <img src={Slot1} alt={"slot1"} width={120} height={120} />;
    const slot2 = <img src={Slot2} alt={"slot2"} width={120} height={120} />;
    const slot3 = <img src={Slot3} alt={"slot3"} width={120} height={120} />;
    const slot4 = <img src={Slot4} alt={"slot4"} width={120} height={120} />;
    const slot5 = <img src={Slot5} alt={"slot5"} width={120} height={120} />;
    const slot6 = <img src={Slot6} alt={"slot6"} width={120} height={120} />;
    const slot7 = <img src={Slot7} alt={"slot7"} width={120} height={120} />;
    const bigwin1 = <img src={BigWin1} alt={"bigwin1"} width={120} height={120} />;
    const bigwin2 = <img src={BigWin2} alt={"bigwin2"} width={120} height={120} />;
    const bigwin3 = <img src={BigWin3} alt={"bigwin3"} width={120} height={120} />;
    const scatter = <img src={Scatter} alt={"bigwin3"} width={120} height={120} />;

    //Arrayt slottiriveille
    const [arvot1,setArvot1] = useState([slot1,slot1,slot1,slot1,slot1])
    const [arvot2,setArvot2] = useState([slot1,slot1,slot1,slot1,slot1])
    const [arvot3,setArvot3] = useState([slot1,slot1,slot1,slot1,slot1])

    //Pisteet
    const [pisteet,setPisteet] = useState(0.0)

    useEffect(() => {
        pisteenlasku(arvot1);
    }, [arvot1]);

    function randomit(min,max) {

        const minimi = Math.ceil(min);
        const maximi = Math.floor(max);
        const randomluku = Math.floor(Math.random() * (maximi - minimi + 1) + minimi);

        return randomluku;
        /*
        if (randomluku === 1) {
            return slot1;
        }
        else if (randomluku === 2) {
            return slot2;
        }
        else if (randomluku === 3) {
            return slot3;
        }
        else if (randomluku === 4) {
            return slot4;
        }
        else if (randomluku === 5) {
            return slot5;
        }
        else if (randomluku === 6) {
            return slot6;
        }
        else if (randomluku === 7) {
            return slot7;
        }
        else if (randomluku === 8) {
            return bigwin1;
        }
        else if (randomluku === 9) {
            return bigwin2;
        }
        else if (randomluku === 10) {
            return bigwin3;
        }
        else if (randomluku === 11) {
            return scatter;
        }
*/

    }


    function spinni() {
        lataus.play()
        const newArvot1=([randomit(1, 11),randomit(1,11),randomit(1,10),randomit(1,11),randomit(1,11)])
        const newArvot2=([randomit(1, 11),randomit(1,11),randomit(1,10),randomit(1,11),randomit(1,11)])
        const newArvot3 =([randomit(1, 11),randomit(1,10),randomit(1,11),randomit(1,11),randomit(1,11)])
        setArvot1(newArvot1)
        setArvot2(newArvot2)
        setArvot3(newArvot3)
        console.log(newArvot1)
    }


    function pisteenlasku(voittorivi){
        if (voittorivi[0] === 1){
            setPisteet(pisteet+1)
        }
    }

    return(
        <div>
            <ul>
                <li>{arvot1}</li>
                <li>{arvot2}</li>
                <li>{arvot3}</li>
            </ul>

            <button onClick={spinni}> SPIN AND WIN</button>
            Voitot: {pisteet} €
        </div>

    )
}


const About = () => {
    return (
        <div>
            <h1 className={"center"}>
                Hunter Hank's Moose of Dead
            </h1>
            <Toiminnallisuus/>
        </div>
    );
};

export default About;