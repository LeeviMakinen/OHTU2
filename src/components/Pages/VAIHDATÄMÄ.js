let paikallinenIP;

const baseIP = "http://localhost";

let sinunIP = "";        //Laita tämän muuttujan arvoksi oman koneen IP-osoite jos halut kokeilla sivua mobiililla, ilman tätä API-kutsut ei toimi kuin localhostilla

let vaihdettavaIP = "http://"+sinunIP;

if (vaihdettavaIP === "http://") {
    paikallinenIP = baseIP + ":8081";
}
else{
    paikallinenIP = vaihdettavaIP+":8081";
}


export { paikallinenIP };
