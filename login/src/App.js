import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserS from './components/UserS';
import LoginForm from './components/LoginForm';
import SubmitButton from './components/SubmitButton';
import './App.css';


class App extends React.Component {

  async componentDidMount() {
    try {

      let res =await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserS.loading = false;
        UserS.isLoggedIn = true;
        UserS.username = result.username;
      }

      else {
        UserS.loading = false;
        UserS.isLoggedIn = false;

      }

    } 

    catch (e) {
      UserS.loading = false;
      UserS.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {

      let res =await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {        
        UserS.isLoggedIn = false;
        UserS.username = '';        
      }

    } 

    catch (e) {
      console.log(e)
    }
  }

  render()  {

    if (UserS.loading) {
      return(
        <div class="App">
          <div className='container'>
            Loading, please wait...                        
          </div>
        
        </div>
      );
    }

    else {
      if (UserS.isLoggedIn) {
        return(
          <div class="App">
            <div className='container'>
              Welcome {UserS.username}

              <SubmitButton
                text={'Log out'}
                disabled={false}
                onClick={ () => this.doLogout() }
              />

            </div>
          
          </div>
        );
      }

      return (
        <div class="App">

          <div className='container'>
            <LoginForm/>            
          </div>
        </div>
        );
    }
    
    
  }
}

export default observer(App);
