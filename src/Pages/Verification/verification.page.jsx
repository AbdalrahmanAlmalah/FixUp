import React, { useRef, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API_LOCAL;

const theme = createTheme({
  palette: {
    primary: {
      main: '#3E54AC',
      dark: '#002884'
    },
    secondary: {
      main: '#e91e63',
      dark: '#ba000d'
    },
  },
});

const paperStyle1 = { width: 900, margin: "10px auto", padding: "30px 20px" };
const AvatarStyle = { backgroundColor: "#3E54AC" };
const TxtFiled = {
  margin: "8px 0",
  border: "2px solid #ccc",
  fontSize: "16px",
  width: "300px", 
  height: "40px",
  textAlign: "center"
};
const btnStyle = { margin: "8px 0", backgroundColor: "#3E54AC", color: "white"};
const paperStyle = {
  padding: 30,
  width: 700,
  margin: "0 auto"
};

const VerificationPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const errRef = useRef();
  const [code, setVerificationCode] = useState("");

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleVerifyClick = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api + "/verify", 
        { code:code },
        {headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true
        });
      if (response?.data === "Verified") {
        navigate('/');
      } else {
        setErr("Wrong Code");
      }
    } catch (error) {
      setErr("Wrong Code");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={20} style={paperStyle1}>
        <Grid container justifyContent="center">
          <Grid item>
            <Paper style={{ ...paperStyle, margin: "0 auto" }}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar style={AvatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <h2>Enter Verification Code Sent to Your Email:</h2>
            </Grid>
            <Grid item>
              <p
                style={{ color: "#e91e63" }}
                ref={errRef}
                className={err ? "err" : "offscreen"}
                aria-live="assertive"
              >
                {err}
              </p>
            </Grid>
            <Grid item>
              <input
                type="text"
                id="verificationCode"
                value={code}
                style={TxtFiled}
                onChange={handleVerificationCodeChange}
              />
            </Grid>
            <Grid item>
              <Button style={btnStyle} onClick={handleVerifyClick}>
                Verify
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
</ThemeProvider>

  );
};

export default VerificationPage;
