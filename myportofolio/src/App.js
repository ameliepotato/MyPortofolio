import './App.css';
import { useState } from "react";
import { Button } from '@mui/material';
import Login from './login';
import Works from './works';

function App() {
  const [hideLogin, setHideLogin] = useState(false);
  const [publicView, setPublicView] = useState(false);
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
            setHideLogin(true);
            document.getElementById("greeting").innerHTML = "Your works"
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
