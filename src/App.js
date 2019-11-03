import React from "react";

import "./App.css";

import  { useIdentityContext  } from 'react-netlify-identity-widget';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

//components
import Navbar from "./components/navbar/navbar.component";

//pages
import HomePage from './pages/Home/Home.page';
import AccountPage from './pages/Account/Account.page';

//redux actions
import {setCurrentUser} from './redux/user/user.actions';



function App() {

  

  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;
 // console.log('user-meta:',identity.user.user_metadata.created_user.ref['@ref'].id)

  const fetchUser = (userId) => {
    return fetch(`/.netlify/functions/user-fetch`, {
      method: 'POST',
      body: JSON.stringify({
        id:userId
      })
      
    }).then(response => {
      return response.json()
    })
  }

   
    fetchUser(248027175496712724)
    .then(res => console.log(res))
    .catch(err => console.log(err))
   




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


const  mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
})

export default connect(
  null,
  mapDispatchToProps
)(App);
