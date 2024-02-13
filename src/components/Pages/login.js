import React, { useState } from 'react';
import "./pages.css"

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);

    const postData = {
        username: username,
        password: password
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSqlSend();
    };

    const [pyynto,setPyynto] = useState("Kirjauduha siekii sissään");
    const handleSqlSend = async () => {
        try {

            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                if(response.status===401){
                    setPyynto("Kukas se sie oot?");
                }
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setPyynto("Tuttu mies!");

        } catch (error) {
            console.log(error);

        }
    };



    return (
        <div>
            <h2>{pyynto}</h2>
            <form onSubmit={handleSubmit}>
                <div>

                    <input
                        placeholder={"Käyttäjänimi"}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>

                    <input placeholder={"Salasana"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
