import axios from "../../api/axios";
import { useRef, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { checkCookie } from "../../CheckCookie/checkCookie";

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

const paperStyle1 = { width: 600, margin: "10px auto", padding: "30px 20px" };
const paperStyle = { padding: 20, width: 500, margin: "0 auto" };
const headerStyle = { margin: 0 };
const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0" };
const TxtFiled = { margin: "8px 0 0 0" };
const FileStyle = {
  padding: "0 0 40px 5px",
  borderRadius: "4px",
  fontSize: "16px",
};

const Ticket = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [allEntered, setAllEntered] = useState(false);
  const [ok, setOk] = useState(true);
  const [err, setErr] = useState("");
  const errRef = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "image/jpeg") {
      setFile(selectedFile);
      setErr();
    } else {
      setOk(false);
      setErr("Please select a JPEG (jpg) file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        api + "/ticket",
        { description, answers },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      if (checkCookie()) {
        if (response?.data === "Ticket Sent!") {
          if (file) {
            handleImage(e);
          }
          navigate("/");
        } else {
          const errorParts = response?.data.split(":");
          const errorMessage = errorParts[errorParts.length - 1].trim();
          setErr(errorMessage);
        }
      } else {
        setErr("You must sign in first!");
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.post(api + "/ticket2", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      setErr("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api + "/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [questions]);

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedSelectedAnswers = [...answers];
    updatedSelectedAnswers[questionIndex] = answer;
    setAnswers(updatedSelectedAnswers);
  };

  useEffect(() => {
    const allQuestionsAnswered =
      answers.length === questions.length && !answers.includes(undefined);
    setAllEntered(allQuestionsAnswered);
  }, [questions, answers]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper elevation={20} style={paperStyle1}>
          <Grid container justifyContent="center">
            <Grid item>
              <Paper style={paperStyle}>
                <Grid align="center">
                  <Avatar style={AvatarStyle}>
                    <SendIcon />
                  </Avatar>
                  <h2 style={headerStyle}>Create A Ticket</h2>
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ font: "20px" }}
                  >
                    Please fill this form to send a ticket
                  </Typography>
                </Grid>
                <form>
                  <p
                    style={{ color: "#e91e63" }}
                    ref={errRef}
                    className={err ? "err" : "offscreen"}
                    aria-live="assertive"
                  >
                    {err}
                  </p>
                  <Grid container spacing={2}>
                    {questions.map((question, index) => (
                      <Grid item xs={12} key={index}>
                        <Typography variant="body1">{question.name}</Typography>
                        {question.answers.map((answer, answerIndex) => (
                          <div key={answerIndex}>
                            <input
                              type="radio"
                              id={`option_${index}_${answerIndex}`}
                              name={`radioGroup_${index}`}
                              value={answer}
                              onChange={() => handleAnswerChange(index, answer)}
                            />
                            <label htmlFor={`option_${index}_${answerIndex}`}>
                              {" "}
                              {answer}
                            </label>
                          </div>
                        ))}
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        placeholder="Enter Description"
                        fullWidth
                        style={TxtFiled}
                        autoComplete="off"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </Grid>
                  </Grid>
                </form>
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={FileStyle}
                  />
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      variant="contained"
                      style={btnStyle}
                      disabled={!allEntered || !ok}
                    >
                      Send Ticket
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default Ticket;