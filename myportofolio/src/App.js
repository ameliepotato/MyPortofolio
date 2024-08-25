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
          <Button onClick={(e) => {
            var newUser = {
              username: document.getElementById("username").value,
              password: document.getElementById("password").value,
              name: document.getElementById("username").value,
              email: document.getElementById("username").value + "@gmail.com"
            };
            newUser.id = appUser.loginUser(newUser, (user)=> {
              setLoggedInUser(user);
            });           
            document.getElementById("greeting").innerHTML = "Your works, " + newUser.name + "!";
            e.preventDefault();
            setHideLogin(true);
          }}>Login</Button>
          <div>
            <Button variant='text' onClick={(e) => {             
              setLoggedInUser(null);
              document.getElementById("greeting").innerHTML = "Public works"
              e.preventDefault();
              setHideLogin(true);
            }}>Stay anonymous</Button>
          </div>
        </div>
      }
      { hideLogin &&
        <div id="works">
          <Works userId={loggedInUser?.id}></Works>
        </div>
      }
    </div>
  );
}

export default App;
