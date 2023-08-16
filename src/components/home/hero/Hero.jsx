import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const btnStyle = {width:"80%", fontSize:"22px"};
const formStyle = {background:"transparent"};

const Hero = () => {
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    setLoggedIn(document.cookie);
  }, [loggedIn]);

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Send A Ticket Now!' subtitle='and FIX all your problems.' />
          <form style={formStyle}>
            {loggedIn ? (
              <Link to={"ticket"}>
                <button className="btn1" style={btnStyle}>
                  Send A Ticket
                </button>
              </Link>
            ) : (
              <Link to={"login"}>
                <button className="btn1" style={btnStyle}>
                  Sign In To Send A Ticket
                </button>
              </Link>
            )}
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
