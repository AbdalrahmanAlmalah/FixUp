import React, { useRef, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { checkCookie } from "../../CheckCookie/checkCookie";

const api = process.env.REACT_APP_API_LOCAL;

const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0", backgroundColor: "#3E54AC" };
const TxtFiled = { margin: "8px 0" };
const paperStyle = {
  padding: 30,
  width: 300,
  margin: "0 auto",
};

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api + "/login", 
      { phone, password },
      {headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
      }
      );
      if (checkCookie()) {
        navigate('/');
        window.location.reload();
      } else {
        setErr(response?.data);
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={AvatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <p
            style={{ color: "#e91e63" }}
            ref={errRef}
            className={err ? "err" : "offscreen"}
            aria-live="assertive"
          >
            {err}
          </p>
          <TextField
            label="Phone"
            placeholder="Enter phone"
            fullWidth
            style={TxtFiled}
            autoComplete="off"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
          <FormControl fullWidth style={TxtFiled}>
            <TextField
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" style={btnStyle}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;