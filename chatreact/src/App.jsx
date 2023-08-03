
import { useState, useEffect } from 'react';

import io from 'socket.io-client';
import './App.css'



// eslint-disable-next-line no-unused-vars
const socket = io("/");


function App() {
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [menssages, setMenssages] = useState([]);

  const hanleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    console.log(newMessage.from);
    setMenssages([...menssages, newMessage]);
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage)
    };
  }, []);

  const receiveMessage = (message) => {
    // Actualiza el estado messages agregando el nuevo mensaje al arreglo existente
    setMenssages((state) => [...state, message]);
  };



  return (
    <>
      <div className='container'>
        <div className='container-form'>

          <h1>Chat React</h1>
          <form action="" onSubmit={hanleSubmit}>
            <input

              type="text"
              placeholder='Write your message...'
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>

          <ul>
            {
              menssages.map(m => (
                <li className={
                  `${m.from == 'Me' ? 'li-my' : 'li-you'}`
                } key={socket.id}>{m.body}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
