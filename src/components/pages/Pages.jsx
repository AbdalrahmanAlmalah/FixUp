import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import SignInOutContainer from "../../Pages/Containers/index.container"
import Ticket from "../../Pages/Ticket/ticket.page"
import History from "../../Pages/History/history.page"
import Profile from "../../Pages/Profile/profile.page"
import Freelancer from "../../Pages/Freelancer/freelancer.page"
import Verification from "../../Pages/Verification/verification.page"

const Pages = () => {
  return (
    <Router>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<SignInOutContainer/>}/>
        <Route path="/ticket" element={<Ticket/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/freelancer" element={<Freelancer/>}/>        
        <Route path="/verification" element={<Verification/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};
export default Pages
