import React, { useState, useEffect } from 'react';

import './App.css';
import { IdentityContextProvider } from 'react-netlify-identity-widget'

//components
import AuthStatusView from './components/auth-status-view/auth-status-view.component';
 

function App() {
  const url = 'https://infallible-mclean-90bb83.netlify.com' // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway
  
  const [ currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(currentUser);
  })
  
  return (
    <IdentityContextProvider url={url}>
      <div className='App'>
        <h1>{currentUser? currentUser.user_metadata.full_name : 'No one!'}</h1>
        <AuthStatusView setCurrentUser={setCurrentUser}/>
      </div>
      
    </IdentityContextProvider>
  )
}
export default App

