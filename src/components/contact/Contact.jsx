import React from "react";
import img from "../images/services.png";
import Back from "../common/Back";
import { Link } from "react-router-dom";

const Contact = () => {
  const pStyle = {
    padding: "20px",
    fontSize: "20px",
  };

  const buttonStyle = {
    padding: "2% 35%",
    fontSize: "18px",
    backgroundColor: "#3E54AC",
    color: "#FFF",
    display: "block",
    margin: "0 auto",
    marginTop:"20px",
    marginBottom:"50px"
  };

  const textStyle = { textAlign: "center", fontSize: "30px", color:"#3E54AC", paddingDown:10, fontWeight: "bold" }

  return (
    <>
      <section className="contact mb">
        <Back name="Contact Us" title="Get Help & Friendly Support" cover={img} />
        <div className="container">
          <form className="shadow" style={{padding:50}}>
            <p style={textStyle}>
              Want to join our team?! 
            </p>
            <p style={textStyle}>
              Sign up now to work as a freelancer
            </p>
            <Link to="/freelancer"><button style={buttonStyle}>Join Now</button></Link>
            <pre style={pStyle}>
              <b>Phone:</b>   123-456-7890
            </pre>
            <pre style={{ fontSize: "20px", paddingLeft: "20px" }}>
              <b>Email:</b>   info@example.com
            </pre>
            <pre style={pStyle}>
              <b>Address:</b>   123 Main Street, City, State, ZIP
            </pre>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;