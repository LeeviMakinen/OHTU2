import React, {useState} from 'react';
import videotausta from "./forestvideo2.mp4";

const videoURL = 'https://dl.dropboxusercontent.com/scl/fi/b8b0g14nqd150lq7jhfsv/forestvideo2.mp4?rlkey=c9ytiz1wbk64244gb4gvmjl3x&dl=0';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    let sqlStatement = 'INSERT INTO tunnukset (`user`, `pass`) VALUES ("'+formData.username+'","'+formData.password+'");';



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSqlSend = async () => {
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ sqlStatement })
            });

            if (!response.ok) {
                throw new Error('Komento epäonnistui');
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lisättiin käyttäjä "+formData.username);

        handleSqlSend();

    };

    return (
        <div>
            <div className={"contentBack"}>
                <video src={videoURL} autoPlay loop muted/>
            </div>




        <h2>Rekisteröidy</h2>
        <form className={"contentFront"} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Käyttäjänimi:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Salasana:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Rekisteröidy</button>
            </form>

        </div>

    );
};

export default Register;
