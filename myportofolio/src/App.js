import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Login from './login';
import Works from './works';
import appUser from './appUser';

function App() {
  const [hideLogin, setHideLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
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
            appUser.loginUser(newUser);
          }}>Login</Button>
          <div>
            <Button variant='text' onClick={() => {
              setHideLogin(true);
              setLoggedInUser(null);
              document.getElementById("greeting").innerHTML = "Public works"
            }}>Stay anonymous</Button>
          </div>
        </div>
      }
      { hideLogin &&
        <div id="works">
          <Works user={loggedInUser} ></Works>
        </div>
      }
    </div>
  );
}

export default App;
