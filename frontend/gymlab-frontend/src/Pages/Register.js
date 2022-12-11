import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    TextField,
    Grid,
    Paper,
    FormControl,
    OutlinedInput ,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Dialog,
    DialogContent,
    Typography,
    Snackbar,
    Alert,
    Item,
    TableHead,
    TableCell,
    TableRow,
    TableBody
  } from "@mui/material";



const Register = ({ handleClose }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toHomePage = () => {
    navigate('/home');
}

  const handleSubmit = (e) => {
    e.preventDefault();
      (async () => {
          const result = await fetch(`/api/register`, {
            method:'POST',
            headers:{
                'Accept':'*/*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:userName,
                email:email,
                password:password
            })})
        result.json().then((response) => {if(result.status != 201) alert(`failed with status ${result.status}`);
        else {
          alert("user created successfully!");
          toHomePage();
        }});
      })()
  }

  return (
    <>
    <Typography sx = {{textAlign:"center", fontSize: "22px", fontWeight: "bold", my:5}}>Register</Typography>
    <form onSubmit={handleSubmit}>
              <Stack direction = "column" alignItems="center" spacing={2}>
      <TextField sx = {{width: '70%'}}
        label="Username"
        variant="filled"
        required
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <TextField sx = {{width: '70%'}}
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField sx = {{width: '70%'}}
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
      </Stack>
    </form>
    </>
  );
};

export default Register;