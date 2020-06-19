import React, { useState, useEffect } from 'react';
import './App.css';

const baseUrl = 'https://localhost:8000'

async function fetchGreetings() {
  const response = await fetch(`${baseUrl}/api/greetings`);
  const json = await response.json();
  return json;
}

async function postGreeting(greeting) {
  const response = await fetch(`${baseUrl}/api/greetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(greeting)
  });

  const json = await response.json();
  console.log(json);
  return json
}




function App() {
  const [greetings, setGreetings] = useState([]);
  const [newGreeting, setNewGreeting] = useState('');
  const [error, setError] = useState('');
  
  async function getGreetings() {
    const json = await fetchGreetings()

    
    setGreetings(json["hydra:member"]);
  }

  useEffect(() => {
    getGreetings().catch((error) => setError(error));
  }, []);

  function postNewGreeting(greeting) {
    if (greeting === '') return;
    const newGreeting = { message: greeting };
    
    postGreeting(newGreeting).then((response) => {
      setNewGreeting('');
      getGreetings();
    }).catch(error => setError(error)) 
  }

  // postGreeting({ message: 'Hallo'});

  return (
    <div className="App">
      <h1>Test</h1>
      <p>{error}</p>
      <input value={newGreeting} onChange={(event) => setNewGreeting(event.target.value)}></input>
      <button onClick={() => postNewGreeting(newGreeting)}>post</button>
  {greetings.map((greeting) => <p key={greeting.id}>{greeting.message}</p>)}
    </div>
  );
}

export default App;
