import React from "react";

import "./App.css";

import  { useIdentityContext  } from 'react-netlify-identity-widget';
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { connect } from 'react-redux';

import history from "./history";


//components
import Navbar from "./components/navbar/navbar.component";

//pages
import HomePage from './pages/Home/Home.page';
import AccountPage from './pages/Account/Account.page';
import SignupLoginPage from "./pages/signup-login/signup-login.page";
import PostSignupLoginPage from './pages/post-signup-login/post-signup-login.page';

//redux actions
import {setCurrentUser} from './redux/user/user.actions';



function App({currentUser, setCurrentUser}) {

  

  const identity = useIdentityContext();
  
  // const faunadbUserId = identity 
  //   && identity.user 
  //   && identity.user.user_metadata 
  //   && identity.user.user_metadata.created_user 
  //   && identity.user.user_metadata.created_user.ref
  //   && identity.user.user_metadata.created_user.ref['@ref'].id
 

  // const fetchUser = (userId) => {
  //   return fetch(`/.netlify/functions/user-fetch`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       id:userId
  //     })
      
  //   }).then(response => {
  //     return response.json()
  //   })
  // }

   
  // useEffect(()=>{

  //  if(faunadbUserId) {
  //     fetchUser(faunadbUserId.toString())
  //   .then(res => res.data)
  //   .then(data => {
  //     setCurrentUser({...data, faunadbUserId: faunadbUserId, hasUserSignedUp:true, isUserLoggedIn:true})

  //   })
  //   .catch(err => console.log(err))
  // }
  
  // console.log('User is: ',currentUser)

  // },[setCurrentUser])

  

  return (
   
      <div className="App">
          
             <Router history={history}>
               
              {((currentUser && currentUser.hasUserSignedUp && currentUser.isUserLoggedIn) && (identity && identity.isLoggedIn))?<Navbar/>:null}
                <Switch>
                  <Route exact path="/" render={()=>(
                    (identity && identity.isLoggedIn)
                    ?(<Redirect to='/home'/>)
                    :(<SignupLoginPage/>)
                  )}/>
                  <Route  path='/post-signup-login' render={() => (
                      !(currentUser && currentUser.hasUserSignedUp && currentUser.isUserLoggedIn)
                      ?<PostSignupLoginPage/>
                      :<Redirect to='/home'/>
                    )}/>
                  <Route  path="/home" render={()=>(
                    (identity && identity.isLoggedIn)
                    ?(<HomePage/>)
                    :(<Redirect to='/'/>) 
                    )}/>
                  <Route  path = '/account' render={() => (
                    currentUser ?
                    <AccountPage/>
                    :<Redirect to='/' />
                  )}/>
                </Switch>
                
               
            </Router>
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
