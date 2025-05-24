// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Header from "./Header";
// import { MenuContext } from "../context/MenuContext";
// import "./Card.css";
// const Card = () => {
//   const { showPopUp, setPopUp } = useState(false);
//   const { menuItems } = useContext(MenuContext);
//   const navigate = useNavigate();
//   const handleOrderClick = (item) => {
//     navigate("/cart", { state: { selectedItem: item } }); // Navigate to cart page with selected item
//   };

//   const checkPin = (item) => {
//     if (true) {
//       handleOrderClick(item);
//     } else {
//       setPopUp(true);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="menu">
//         {menuItems.map((item) => (
//           <div key={item.id} className="card">
//             <img src={item.imageUrl} alt={item.name} />
//             <div className="overlay">
//               <h3>{item.name}</h3>
//               <p className="price">{item.price}</p>
//             </div>
//             <button className="order-btn" onClick={() => checkPin(item)}>
//               Order Now
//             </button>
//           </div>
//         ))}
//       </div>
//       {!showPopUp && (
//         <div className="popup">
//           <div className="popup-content">
//             <h3>Call Us</h3>
//             <p>
//               Call us at: <strong>123565</strong>
//             </p>
//             <button onClick={() => setPopUp(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { MenuContext } from "../context/MenuContext";
import "./Card.css";

const Card = () => {
  const [showPopUp, setPopUp] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinText, setPinText] = useState(false);
  const [item, setItem] = useState({}); // ✅ fixed
  const { menuItems } = useContext(MenuContext);
  const navigate = useNavigate();

  const handleOrderClick = (pin, selectedItem) => {
    if (pin === "1234") {
      navigate("/cart", { state: { selectedItem } });
      setPin("");
      setPinText(false);
    } else {
      setPopUp(true);
    }
  };

  const handlePinText = (e) => {
    const enteredPin = e.target.value;
    setPin(enteredPin);
    if (enteredPin.length === 4) {
      handleOrderClick(enteredPin, item); // ✅ use current item and pin
    }
  };

  return (
    <>
      <Header />
      <div className="menu">
        {menuItems.map((item) => (
          <div key={item.id} className="card">
            <img src={item.imageUrl} alt={item.name} />
            <div className="overlay">
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
            </div>
            <button
              className="order-btn"
              onClick={() => {
                setItem(item);
                setPinText(true);
                setPopUp(false); // reset error popup if needed
              }}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {showPinText && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Ur PinCode</h3>
            <p>Check Whether Our Delivery available</p>

            <input
              className="text"
              placeholder="Enter 4-digit PIN"
              maxLength="4"
              onChange={handlePinText}
            />
          </div>
        </div>
      )}

      {showPopUp && (
        <div className="popup">
          <div className="popup-content">
            <h3>Sorry !</h3>
            <p>Delivery is not available at this location.</p>
            <button
              onClick={() => {
                setPopUp(false);
                setPinText(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
