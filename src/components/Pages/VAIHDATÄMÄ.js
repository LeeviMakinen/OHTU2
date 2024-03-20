let paikallinenIP;

const baseIP = "http://localhost";

let vaihdettavaIP = "http://"; //Laita tämän muuttujan arvoksi oman koneen IP-osoite jos halut kokeilla sivua mobiililla, ilman tätä API-kutsut ei toimi

if (vaihdettavaIP === "http://") {
    paikallinenIP = baseIP + ":8081";
}
else{
    paikallinenIP = vaihdettavaIP+":8081";
}


export { paikallinenIP };
