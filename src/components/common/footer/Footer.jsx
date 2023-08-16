import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo-light.png' alt='' />
              <h2>Your Place For Fixing Any Problem</h2>
            </div>
          </div>

        </div>
      </footer>
      <div className='legal'>
        <span>© 2023 FixUP. Designd By Z.</span>
      </div>
    </>
  )
}

export default Footer
