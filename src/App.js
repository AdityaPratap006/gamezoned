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
