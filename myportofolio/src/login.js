import './App.css';
import TextField from '@mui/material/TextField';

function Login() {
    return (
        <div>
            <div className='Div-Space'>
                <TextField id="username" label="User name" variant="outlined" />
            </div>
            <div className='Div-Space'>
                <TextField type="password" id="password" label="Password" variant="outlined" />
            </div>
        </div>
    );
}

export default Login;
