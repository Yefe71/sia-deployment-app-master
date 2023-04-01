import React from 'react'
import NavbarCSS from './Navbar.module.css'
import logo from '../../assets/logo.png'
const Navbar = () => {
  return (
    <>
    <div className={NavbarCSS.navParent}>
        
      <div className={NavbarCSS.leftNav}>
        <div className={NavbarCSS.imgWrapper}>
        <img src={logo} alt="" />
        </div>
        <div className={NavbarCSS.leftNavText}>
          <h2>
            Advance<span>IT</span>
          </h2>
          <h3>Information Technology Department</h3>
        </div>

      </div>

        <div className={NavbarCSS.rightNav}>
            <h3>November 7, 2002</h3>          
        </div>
    </div>
    <div className={NavbarCSS.subNav}>
        <div className={NavbarCSS.subNavWrapper}>
            
            <h3>Blockclasses Utility</h3>
            <h3>Student List</h3>
            <h3>Block Management</h3>
            
        </div>
    </div>
    </>
  );
  
}

export default Navbar