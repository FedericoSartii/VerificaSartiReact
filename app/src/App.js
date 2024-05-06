import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState();
  const [result, setResult] = useState([]);

  const handleInput = (e) => {
    setNumber(e.target.value);
  };

  async function invia(){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero: number,
      }),
    });

    const r = await response.json();
    setResult(r);
  }

  async function start(){
    //setIsLoading(true);
    
    const response = await fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await response.json();
    setPartita(r);
    setIsLoading(false);
    setShowForm(true);
  }

  return (
    <div className="App">
      <h1>Indovina Numero</h1>
      <button onClick = {start}>Inizia il Gioco</button> <br/>
      {showForm &&
      <div>
        <p>
          ID: {partita.id} <br />
          Tentativi: {result.tentativi || partita.tentativi}
        </p>
        <p>Inserisci un numero compreso tra 1 a 100:
          <br></br>
          <input type='number' onChange = {handleInput} placeholder = ''></input>
          <button onClick = {invia}>Invia</button>
        </p>
      </div>
      }
      {result.risultato === 0 && <p>Complimenti, hai indovinato in {result.tentativi} tentativi</p> 
      }

      {result.risultato === 1 && <p>Il numero è troppo grande. RIPROVA.</p>
      }

      {result.risultato === -1 && <p>Il numero è troppo piccolo. RIPROVA.</p>
      }

    </div>
  );
}

export default App;



