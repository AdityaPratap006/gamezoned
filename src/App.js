import React, { useState, useEffect } from 'react';

import './App.css';


import netlifyIdentity from 'netlify-identity-widget';
//import 'react-netlify-identity-widget/styles.css'

netlifyIdentity.init()

function App() {

  const { currentUser, setCurrentUser } = useState(null)

  const handleClick = () => {
    console.log('LOOK HERE!', netlifyIdentity)
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      console.log('Welcome ', user);
       //setCurrentUser(user);
    })
    
  }

  const user = netlifyIdentity.currentUser();


  const handleClick2 = () => {
   
    console.log("USER:", user)
    fetch('/.netlify/functions/protected-function',user && user.token && {
      method:'GET',
      headers:{
        Authorization: 'Bearer ' + user.token.access_token,
      }
    })
    .then(res => res.json())
    .then(x => x.data === 'NOT ALLOWED' ? netlifyIdentity.open() : console.log(x))
    .catch(err => console.log(err))

  }


  return (
    
      <div className='App'>
        Hello! {currentUser && currentUser.user_metadata.full_name}
        <br/>
        <button onClick={ handleClick }>Login</button>
        <button onClick={handleClick2}>Authorize</button>
      </div>
    )
}
export default App

