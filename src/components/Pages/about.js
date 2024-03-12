import React from "react";
import "./pages.css";
import kuva from "./pojat.PNG";
const About = () => {
    return (

        <div>
            <div className="container">
                <div className="post">
                    <div className="row">
                        <div className="col-lg-6">
                            <div id="Kuka">
                                <p>Jimi ja Leevi tapasivat toisensa sattumalta pienessä kahvilassa, kun he molemmat
                                    tilasivat vahvaa kahvia ja istuivat vierekkäin ikkunapöydässä. Aluksi heidän
                                    keskustelunsa oli kevyttä, mutta pian he huomasivat jakavansa samanlaisen
                                    huumorintajun ja elämänarvot.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post">
                    <div className="row">
                        <div className="col-lg-6">
                            <div id="Kuka">
                                <p>Jimi, taiteellinen sielu, oli rumpali paikallisessa bändissä. Hänen silmänsä
                                    kirkastuivat, kun hän puhui musiikistaan ja siitä, miten se toi iloa hänen
                                    elämäänsä. Leevi, kirjastonhoitaja, oli hiljainen ja varattu, mutta hänen silmissään
                                    oli syvä viisaus ja uteliaisuus maailmaa kohtaan.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post">
                    <div className="row">
                        <div className="col-lg-6">
                            <div id="Kuka">
                                <p>Pian he alkoivat nähdä toisiaan useammin, ja jokainen kohtaaminen syvensi heidän yhteyttään. Jimi soitti Leeville kauniita säveliä, ja Leevi jakoi hänen kanssaan lempikirjojaan. He kävelivät yhdessä puistoissa ja istuivat rannalla katsellen auringonlaskuja.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default About;