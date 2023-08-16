import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Rating, CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import img from "../../components/images/services.png"
import Back from "../../components/common/Back"
import { checkCookie } from "../../CheckCookie/checkCookie";

const api = process.env.REACT_APP_API_LOCAL;

const tableStyle = { height: 400, margin: 40 };
const theme = createTheme({
  palette: {
    primary: {
      main: "#3E54AC",
      dark: "#002884",
    },
    secondary: {
      main: "#e91e63",
      dark: "#ba000d",
    },
  },
});

const History = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  const columns = [
    { field: "creationDate", headerName: "Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status !== "Done") {
          return null;
        }

        const handleRatingChange = async (event) => {
          const newRating = parseInt(event.target.value);
          const newRows = rows.map((row) =>
            row.id === params.row.id ? { ...row, rating: newRating } : row
          );
          setRows(newRows);
          
          try {
            await fetchRatingUpdate(params.row.id, newRating);
          } catch (error) {
            console.error("Error updating rating:", error);
          }
        };
        
        const fetchRatingUpdate = async (ticketId, rating) => {
          try {
            await axios.patch(api + "/ticket/" + ticketId, 
            { rating }, 
            {headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              withCredentials: true,
            });
          } catch (error) {
            console.error("Error updating rating:", error);
          }
        };        

        return (
          <Rating
            name={`rating-${params.row.id}`}
            value={params.row.rating || 0}
            onChange={handleRatingChange}
            precision={1}
            size="small"
          />
        );
      },
    },
  ];

  const fetchData = async () => {
    if (checkCookie()) {
      try {
        const response = await axios.get(api + "/tickets/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const tickets = response?.data;
        if (Array.isArray(tickets)) {
          const formattedTickets = tickets.map((ticket) => {
            const formattedDate = new Date(
              ticket.creationDate
            ).toLocaleString();
            return {
              id: ticket._id,
              creationDate: formattedDate,
              status: ticket.status,
              description: ticket.description,
              rating: ticket.rating,
            };
          });
          setRows(formattedTickets);
        }
        setLoading(false);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, );

  return (
    <ThemeProvider theme={theme}>
      <section className='contact mb'>
        <Back name='History' title='My Tickets' cover={img} />
        <Grid item style={{ margin: 70 }}>
          <div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div style={tableStyle}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            )}
          </div>
        </Grid>
      </section>
    </ThemeProvider>
  );
};

export default History;