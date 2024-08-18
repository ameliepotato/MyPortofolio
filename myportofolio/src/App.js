import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Login from './login';
import Works from './works';
import axios from 'axios';

function App() {
  const urlUserService = 'http://localhost:5003/users';
  const [hideLogin, setHideLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function createUser(newUser) {
    try {      
      const response = await axios.post(urlUserService, newUser);
      console.log('User Created:', response.data);
      return response.data._id; // Return the user ID for further operations
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p id="greeting" className="App-link">
          Welcome to your portofolio!
        </p>
      </header>
      {!hideLogin &&
        <div id="login">
          <Login></Login>
          <Button onClick={() => {
            var newUser = {
              username: document.getElementById("username").value,
              password: document.getElementById("password").value,
              name: document.getElementById("username").value,
              email: document.getElementById("username").value + "@gmail.com"
            };
            setLoggedInUser(newUser);
            document.getElementById("greeting").innerHTML = "Your works, " + newUser.name + "!";
            setHideLogin(true);
            createUser(newUser);
          }}>Login</Button>
          <div>
            <Button variant='text' onClick={() => {
              setHideLogin(true);
              document.getElementById("greeting").innerHTML = "Public works"
            }}>Stay anonymous</Button>
          </div>
        </div>
      }
      {
        (hideLogin) && 
        <div id="works">
          <Works user={loggedInUser} ></Works>
        </div>
      }
    </div>
  );
}

export default App;
