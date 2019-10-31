import React, { useState, useEffect } from 'react';

import './App.css';



function App() {

  
function createPost(data) {
  return fetch('/.netlify/functions/post-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

// Game data
const myGame = {
  title: 'Game Title',
  
  developedBy: 'Developer'
}


  const [created, setCreated] = useState(false)

  useEffect(() => {
          // create it!
      createPost(myGame).then((response) => {
        console.log('API response', response)
        // set app state
        setCreated(true);
      }).catch((error) => {
        console.log('API error', error)
      })
  },[])

  

  return (
    <div className="App">
      {
        created? <h1>Created!</h1> : <h1>Couldn't create</h1>
      }
    </div>
  );
}

export default App;
