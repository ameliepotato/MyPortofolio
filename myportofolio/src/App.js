import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Login from './login';
import Works from './works';
import axios from 'axios';

const urlUserService = 'http://localhost:5000/users';

function App() {
  const [hideLogin, setHideLogin] = useState(false);
  const [publicView, setPublicView] = useState(false);

  async function createUser() {
    try {
      var newUser = {
            username: document.getElementById("username").value,
            password:  document.getElementById("password").value,
            name: "NewUser",
            email: "new@user.com"
        };
        const response = await axios.post(urlUserService, newUser);
        console.log('User Created:', response.data);
        document.getElementById("greeting").innerHTML = "Your works, " + document.getElementById("username").value + "!";
        setHideLogin(true);
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
            createUser();
          }}>Login</Button>
          <div>
            <Button variant='text' onClick={() => {
              setPublicView(true);
              setHideLogin(true);
              document.getElementById("greeting").innerHTML = "Public works"
            }}>Stay anonymous</Button>
          </div>
        </div>
      }
      {
        (hideLogin) &&
        <div id="works">
          <Works publicView={publicView}></Works>
        </div>
      }
    </div>
  );
}

export default App;
