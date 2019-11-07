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
import SharePostPage from './pages/share-post/share-post.page';
import TrendingPage from './pages/Trending/Trending.page';

function App({currentUser }) {
  
  const identity = useIdentityContext();
 
  return (
   
      <div className="App">
          
             <Router history={history}>
               
              {
                ((currentUser && currentUser.hasUserSignedUp && currentUser.isUserLoggedIn) 
                   && (identity && identity.isLoggedIn))
                ?<Navbar/>
                :null
              }
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

                <Route  path="/trending" render={()=>(
                  (currentUser)
                  ?(<TrendingPage/>)
                  :(<Redirect to='/'/>) 
                  )}/>

                <Route  path="/share-post" render={()=>(
                  (currentUser)
                  ?(<SharePostPage/>)
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

 

export default connect(
  mapStateToProps,
  null
)(App);
