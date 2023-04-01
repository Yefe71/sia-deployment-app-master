import React, { useRef, useEffect, useState, createRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/bundle";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

import adminCSS from "./Admin.module.css";
import NavBox from "../../components/NavBox/NavBox";
import plm from "../../assets/plm.png";
const Admin = ({ setAccess, access }) => {
  return (
    <>
      <div className={adminCSS.adminParent}>
        <div className={adminCSS.adminWrapper}>
          <img src={plm} alt="" />

          <div className={adminCSS.rightAdmin}>

            <div className={adminCSS.authTitle}>
              <h2>ADMIN LOGIN</h2>
            </div>
            

            <div className={adminCSS.authWrapper}>
              <input
                className={adminCSS.username}
                type="email"
                placeholder="Username"
              />
              <input
                className={adminCSS.password}
                type="password"
                placeholder="Password"
              />
              <button
                className={adminCSS.loginBtn}
                onClick={() => setAccess(true)}
              >
                LOGIN
              </button>
            </div>

          </div>

          
        </div>

        {/* <Swiper
          autoplay={{ delay: 10000 }}
          modules={[Pagination, Autoplay, Navigation]}
          className={adminCSS.swiper}
          pagination={true}
        >
          <SwiperSlide className={`${adminCSS.swiperSlide}`}><img src="https://www.mdsi.edu.ph/uploads/Gallery/Facilities/facility_computer_laboratory.JPG" alt="Placeholder Image 1"/></SwiperSlide>
          <SwiperSlide className={`${adminCSS.swiperSlide}`}><img src="https://www.mdsi.edu.ph/uploads/Gallery/Facilities/facility_computer_laboratory.JPG" alt="Placeholder Image 1"/></SwiperSlide>
          <SwiperSlide className={`${adminCSS.swiperSlide}`}><img src="https://www.mdsi.edu.ph/uploads/Gallery/Facilities/facility_computer_laboratory.JPG" alt="Placeholder Image 1"/></SwiperSlide>
          <SwiperSlide className={`${adminCSS.swiperSlide}`}><img src="https://www.mdsi.edu.ph/uploads/Gallery/Facilities/facility_computer_laboratory.JPG" alt="Placeholder Image 1"/></SwiperSlide>
        </Swiper> */}
      </div>
    </>
  );
};

export default Admin;
