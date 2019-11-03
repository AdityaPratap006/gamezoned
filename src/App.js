import React, {useEffect} from "react";

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



function App({currentUser, setCurrentUser}) {

  

  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;
  const faunadbUserId = identity 
    && identity.user 
    && identity.user.user_metadata 
    && identity.user.user_metadata.created_user 
    && identity.user.user_metadata.created_user.ref
    && identity.user.user_metadata.created_user.ref['@ref'].id
 

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

   
  useEffect(()=>{

   if(faunadbUserId) {
      fetchUser(faunadbUserId.toString())
    .then(res => res.data)
    .then(data => {
      setCurrentUser({...data, faunadbUserId: faunadbUserId})

    })
    .catch(err => console.log(err))
  }
  
  console.log('fired!',currentUser)

  },[setCurrentUser])


  return (
   
      <div className="App">
           <Navbar/>
           <Switch>
            <Route exact path="/" component={HomePage} />
            <Route  path = '/account' render={() => (
              currentUser?
              <AccountPage/>
              :<Redirect to='/' />
            )}/>
          </Switch>
        
      </div>
    
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const  mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
