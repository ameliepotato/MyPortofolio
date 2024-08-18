import './App.css';
import TextField from '@mui/material/TextField';

function Login() {
    return (
        <div>
            <div className='Div-Space'>
                <TextField id="username" label="User name" variant="outlined" required/>
            </div>
            <div className='Div-Space'>
                <TextField type="password" id="password" label="Password" variant="outlined" required/>
            </div>
        </div>
    );
}

export default Login;
