import React from "react"
import img from "../images/services.png"
import Back from "../common/Back"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Services = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Services -All Services' cover={img} />
        <div className='featured container'>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Services
