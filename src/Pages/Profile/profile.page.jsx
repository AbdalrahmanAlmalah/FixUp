import React, { useState, useEffect } from "react";
import "./profile.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { checkCookie } from "../../CheckCookie/checkCookie";

const api = process.env.REACT_APP_API_LOCAL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [region, setRegion] = useState("");
  const [tickets, setTickets] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
	const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

	useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api + "/regions");
        setRegions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [regions]);

  const fetchData = async () => {
    if (checkCookie()) {
      try {
        const response = await axios.get(api + "/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setUser(response?.data);

        const response2 = await axios.get(api + "/region/" + response?.data.region);
        setRegion(response2?.data.name);

        const response3 = await axios.get(api + "/tickets/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setTickets(response3?.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  const handleEditClick = () => {
		setIsEditMode(true);
		setRegion(user?.region);
	};	

  const handleSaveClick = async() => {
    if (checkCookie()) {
      try {
        const response = await axios.patch(api + "/user", 
				{ ...user, region },
				{
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
				setIsEditMode(false);
				window.location.reload();
      } catch (error) {
				setIsEditMode(false);
        console.error("Error fetching data:", error);
      }
    } else {
			setIsEditMode(false);
      navigate("/profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-content">
          <div
            className="profile-sidebar"
            style={{ background: "linear-gradient(to right, #7098DA, #3E54AC)", borderRadius: "10px" }}
          >
            <div className="profile-picture">
              <AccountCircleRoundedIcon className="icon" style={{ fontSize: 90 }} />
            </div>
            <h2>{user?.name}</h2>
          </div>
          <div className="profile-info">
            <div className="edit-icon-container">
              {isEditMode ? (
                <span className="edit-icon" onClick={handleSaveClick}>
									<i className="fa fa-check" />
								</span>
              ) : (
                <span className="edit-icon" onClick={handleEditClick}>
                  <i className="fa fa-pencil" />
                </span>
              )}
            </div>
            <h2 style={{ textAlign: "center", color: "#3E54AC" }}>About Me</h2>
            <p>
              <b>Phone Number: </b>{user?.phone}
            </p>
            <p>
              <b>Region: </b>{" "}
              {isEditMode ? (
                <select
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
									{regions.map((regionItem, index) => (
										<option key={index} value={regionItem.name}>
											{regionItem.name}
										</option>
									))}
								</select>
              ) : (
                region
              )}
            </p>
            <p>
              <b>Street: </b>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={user?.street}
                  onChange={(e) => setUser({ ...user, street: e.target.value })}
                />
              ) : (
                user?.street
              )}
            </p>
            <p>
              <b>Building: </b>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={user?.building}
                  onChange={(e) => setUser({ ...user, building: e.target.value })}
                />
              ) : (
                user?.building
              )}
            </p>
            <p>
              <b>Floor: </b>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={user?.floor}
                  onChange={(e) => setUser({ ...user, floor: e.target.value })}
                />
              ) : (
                user?.floor
              )}
            </p>
            <p>
              <b>Flat: </b>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  value={user?.flat}
                  onChange={(e) => setUser({ ...user, flat: e.target.value })}
                />
              ) : (
                user?.flat
              )}
            </p>
            <div className="tickets-section">
              <p className="tickets-label">Tickets</p>
              <div className="tickets-line"></div>
              <p className="tickets-count">{tickets}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;