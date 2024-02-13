import React, { useEffect, useState } from 'react';

import './/pages.css';
import ".//layout";







function Database() {

    const [id,setId] = useState('');
    const [nimi,setNimi] = useState('');
    const [osumat,setOsumat] = useState('');

    const handleIDChange = (event) =>{
        setId(event.target.value);
    };

    const handleNameChange = (event) =>{
        setNimi(event.target.value);
    };

    const handleOsumaChange = (event) =>{
        setOsumat(event.target.value);
    };

    const handleSubmit = (event) =>{

        event.preventDefault();

        handleSqlSend();
        console.log("lähetettiin",sqlStatement)

        resetValues();
    }

    const resetValues = (event)=>{
        setId('ID');
        setNimi('Nimi');
        setOsumat('Osumat');

    }


    const [data, setData] = useState([]);

    let sqlStatement = 'INSERT INTO ukot (ID,Nimi,Osumia_kaveriin) values ('+id+",'"+nimi+"',"+osumat+");";
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/ukot')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    });

    const handleDeletion= (event)=>{
        const poistoLause = "DELETE FROM ukot WHERE  `ID`="+id+";";
        sqlStatement=poistoLause;
        console.log(sqlStatement);
        handleSqlSend();
        resetValues();

    }


    const handleSqlSend = async () => {
        try {
            const response = await fetch('http://localhost:8081/lisaarivi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sqlStatement })
            });

            if (!response.ok) {
                throw new Error('Komento epäonnistui');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div>

            <h1 className={"heading"}>Backend data fetch test</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nimi</th>
                    <th>Osumia kaveriin</th>
                </tr>
                </thead>
                <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.ID}</td>
                        <td>{d.Nimi}</td>
                        <td>{d.Osumia_kaveriin}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <form onSubmit={handleSubmit}>

                        <input
                            placeholder={"ID"}
                            type={"text"}
                            value={id}
                            onChange={handleIDChange}
                        />

                    <br/>
                        <input placeholder={"Nimi"}
                               type={"text"}
                               value={nimi}
                               onChange={handleNameChange}
                        />
                    <br/>
                        <input placeholder={"Osumat"}
                               type={"text"}
                               value={osumat}
                               onChange={handleOsumaChange}
                        />
                    <br/>
                    <button type={"submit"}>Lähetä</button>
                </form>
            </div>

            <div>
                <button onClick={handleDeletion}>Poista ID:llä</button>
            </div>

        </div>
    );
}


export default Database;
