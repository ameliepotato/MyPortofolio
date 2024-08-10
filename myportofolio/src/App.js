import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Login from './login';
import Works from './works';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <p id="greeting" className="App-link">
          Welcome to your portofolio!
        </p>
      </header>
      {!loggedIn &&
        <div id="login">
          <Login></Login>
          <Button onClick={() => {
            setLoggedIn(true);
            document.getElementById("greeting").innerHTML = "Your works"
          }}>Login</Button>
        </div>
      }
      {
        loggedIn &&
        <div id="works"> 
          <Works></Works>
        </div>
      }
    </div>
  );
}

export default App;
