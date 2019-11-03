import React from "react";

import "./App.css";

import  { useIdentityContext  } from 'react-netlify-identity-widget';
import { Switch, Route, Redirect } from "react-router-dom";

//components
import Navbar from "./components/navbar/navbar.component";

//pages
import HomePage from './pages/Home/Home.page';
import AccountPage from './pages/Account/Account.page';


function App() {

  

  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;


  const fetchUser = (userId) => {
    return fetch(`/.netlify/functions/user-fetch`, {
      method: 'POST',
      id:userId
      
    }).then(response => {
      return response.json()
    })
  }

   
    // fetchUser('247878464032473618')
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
   



  return (
   
      <div className="App">
           <Navbar/>
           <Switch>
            <Route exact path="/" component={HomePage} />
            <Route  path = '/account' render={() => (
              isLoggedIn?
              <AccountPage/>
              :<Redirect to='/' />
            )}/>
          </Switch>
        
      </div>
    
  );
}
export default App;
