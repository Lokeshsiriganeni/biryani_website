import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { AiFillCustomerService } from "react-icons/ai";
import { GiBugleCall } from "react-icons/gi";

import "./Contact.css";
function Contact() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showPopUp, setPopUp] = useState(false);

  const phoneNumber = "+919819745933"; // Replace with your phone number

  useEffect(() => {
    // Detect if user is on a mobile device
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const showPhoneCard = () => {
    console.log("isMobile:", isMobile);
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`; // Opens dial pad on mobile
    } else {
      setPopUp(true);
    }
  };

  return (
    <>
      <Header />
      <div className="getInTouch-container">
        <div className="food-images">
          <FcCustomerSupport className="food-icon support" />
          <GiBugleCall className="call" />
        </div>

        <div className="contact-container">
          <div>
            <h1 className="heading">Get in touch with us</h1>
            <div className="contact">
              <FaPhoneVolume />
              <p>
                <a onClick={showPhoneCard}>Call Us</a>
              </p>
            </div>
            <div className="contact">
              <FaWhatsapp />

              <p>
                <a href="https://wa.me/919819745933" target="_blank">
                  Message Us
                </a>
              </p>
            </div>
            <div className="contact">
              <MdEmail />

              <p>
                <a href="mailto:teluguandhrapg@gmail.com">
                  teluguandhrapg@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="food-images">
          <AiFillCustomerService className="food-icon" />
        </div>
      </div>
      {showPopUp && (
        <div className="popup">
          <div className="popup-content">
            <h3>Call Us</h3>
            <p>
              Call us at: <strong>{phoneNumber}</strong>
            </p>
            <button onClick={() => setPopUp(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
