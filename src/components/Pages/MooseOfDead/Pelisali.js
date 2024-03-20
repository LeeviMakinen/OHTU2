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
import Lataus from "./Äänet/Lataus.mp3"
import Pyssy from "./Äänet/Pyssy.mp3"
import EiRahaa from "./Äänet/EiRahaa.mp3"
import Theme from "./Äänet/theme.wav"
import "../about.css";


const Musat = () => {
    const [audio] = useState(new Audio(Theme));

    useEffect(() => {
        audio.loop = true;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {}).catch(error => {
                // Auto-play was prevented
                // You can handle this scenario here, like showing a play button
                console.error('Audio playback prevented:', error);
            });
        }

        return () => {
            audio.pause();
        };
    }, [audio]);

    return null;
};
const Toiminnallisuus = () => {

    //Äänet
    const lataus= new Audio(Lataus)
    const pyssy = new Audio(Pyssy)
    const hirvi = new Audio(EiRahaa)
    pyssy.volume = 0.3;
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
    const [arvot1,setArvot1] = useState([3,1,7,2,0])
    const [arvot2,setArvot2] = useState([0,3,8,2,2])
    const [arvot3,setArvot3] = useState([6,5,4,2,1])

    const [kuvat1, setKuvat1] = useState([slot4,slot2,bigwin1,slot3,slot1])
    const [kuvat2, setKuvat2] = useState([slot1,slot4,bigwin2,slot3,slot3])
    const [kuvat3, setKuvat3] = useState([slot7,slot6,slot5,slot3,slot2])


    //Pisteet
    const [pisteet,setPisteet] = useState(10.5)

    useEffect(() => {
        pisteenlasku(arvot1);
        pisteenlasku(arvot2);
        pisteenlasku(arvot3);
    }, [arvot1],[arvot2],[arvot3]);

    function randomit(min,max) {

        const minimi = Math.ceil(min);
        const maximi = Math.floor(max);
        const randomluku = Math.floor(Math.random() * (maximi - minimi + 1) + minimi);

        return randomluku;
    }


    function spinni() {
        if (pisteet <= 0){
            hirvi.play()
        }
        else {
            lataus.play()
            const newArvot1=([randomit(1, 11),randomit(1,11),randomit(1,10),randomit(1,11),randomit(1,11)])
            const newArvot2=([randomit(1, 11),randomit(1,11),randomit(1,10),randomit(1,11),randomit(1,11)])
            const newArvot3 =([randomit(1, 11),randomit(1,10),randomit(1,11),randomit(1,11),randomit(1,11)])
            setArvot1(newArvot1)
            setArvot2(newArvot2)
            setArvot3(newArvot3)
            setKuvat1(kuvatjee(newArvot1))
            setKuvat2(kuvatjee(newArvot2))
            setKuvat3(kuvatjee(newArvot3))
        }
    }

    function kuvatjee(numeroust) {
        return numeroust.map(alkioust => {
            if (alkioust === 1) {
                return slot1;
            } else if (alkioust === 2) {
                return slot2;
            } else if (alkioust === 3) {
                return slot3;
            } else if (alkioust === 4) {
                return slot4;
            } else if (alkioust === 5) {
                return slot5;
            } else if (alkioust === 6) {
                return slot6;
            } else if (alkioust === 7) {
                return slot7;
            } else if (alkioust === 8) {
                return bigwin1;
            } else if (alkioust === 9) {
                return bigwin2;
            } else if (alkioust === 10) {
                return bigwin3;
            } else if (alkioust === 11) {
                return scatter;
            }
        });
    }


    function pisteenlasku(voittorivi){
        setPisteet(pisteet - 0.5);

        setTimeout(() => { // Adding a small delay to ensure state update is reflected
            if (voittorivi[0] === voittorivi[1] && voittorivi[1] === voittorivi[2] && voittorivi[2] === voittorivi[3] && voittorivi[3] === voittorivi[4]) {
                setPisteet(prevPisteet => prevPisteet + 100);
                console.log("5 voitto");
                console.log("+100 euroa");
                pyssy.play();
            } else if (voittorivi[0] === voittorivi[1] && voittorivi[1] === voittorivi[2] && voittorivi[2] === voittorivi[3]) {
                setPisteet(prevPisteet => prevPisteet + 10);
                console.log("4 voitto");
                console.log("+10 euroa");
                pyssy.play();
            } else if (voittorivi[0] === voittorivi[1] && voittorivi[1] === voittorivi[2]) {
                setPisteet(prevPisteet => prevPisteet + 5);
                console.log("3 voitto");
                console.log("+5 euroa");
                pyssy.play();
            } else if (voittorivi[0] === voittorivi[1]) {
                setPisteet(prevPisteet => prevPisteet + 0.5);
                console.log("2 voitto");
                console.log("omat takas");
                pyssy.play();
            }
        }, 0);
    }



    return(
        <div>
            <ul>
                <li>{kuvat1}</li>
                <li>{kuvat2}</li>
                <li>{kuvat3}</li>
            </ul>

            <button onClick={spinni}> SPIN AND WIN</button>
            Voitot: {pisteet} €
        </div>

    )
}


const Pelisali = () => {
    return (
        <div>
            <div className="container">
                <div className="post">
                    <h1 className={"center"}>
                        Hunter Hank's Moose of Dead
                    </h1>
                    <Toiminnallisuus/>
                    <Musat/>
                </div>

            </div>

        </div>
    );
};

export default Pelisali;