import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

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


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      (async () => {
          const result = await fetch(`/api/login`, {
            method:'POST',
            headers:{
                'Accept':'*/*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:userName,
                password:password
            })}).then(response=>response.json())
            .then(data=>
            {
              Cookies.set('token', data.accessToken, { expires: 1, path: '' })
              //toCategoryPage();
              window.location.href = "/category";
            }).catch((error) => {
                alert("bad username or password!");
            })
      })()
  }

  return (
    <>
    <Typography sx = {{textAlign:"center", fontSize: "22px", fontWeight: "bold", my:5}}>Login</Typography>
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
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
      </Stack>
    </form>
    </>
  );
};

export default Login;