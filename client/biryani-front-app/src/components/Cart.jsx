import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Cart.css"; // Import CSS file
import axios from "axios";
import Header from "./Header";
import Popupmesg from "./Popupmesg";
const Cart = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  // console.log(selectedItem);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  if (!selectedItem) {
    return <h2>No items in the cart</h2>;
  }

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleBuyNow = () => {
    const { name, address, phone } = userDetails;
    if (!name || !address || !phone) {
      alert("Please fill in all details");
      return;
    }

    const message = `Order Details:
     Item: ${selectedItem.name}
     Quantity: ${quantity}
     Total Price: ₹${selectedItem.price * quantity}
    
     Name: ${name}
     Address: ${address}
     Phone: ${phone}`;

    // const orderDetails = {
    //   itemName: selectedItem.name,
    //   name: name,
    //   quantity: quantity,
    //   price: selectedItem.price * quantity,
    //   address: address,
    //   number: phone,
    // };

    // try {
    //   const res = await axios.post("/api/addOrder", orderDetails);
    //   alert(res.data.message);
    // } catch (err) {
    //   console.error("Error placing order:", err);
    //   alert("Failed to place order");
    // }

    const orderData = {
      itemName: selectedItem.name,
      name: name,
      price: selectedItem.price * quantity,
      quantity: quantity,
      address: address,
      number: phone, // Not `phone`
    };

    axios
      .post("http://localhost:5000/api/addOrder", orderData)
      .then((res) => {
        setShowPopup(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setShowPopup(true);
        setMessage(err);
        console.log(err);
      });

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/919642686968?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setUserDetails({ name: "", address: "", phone: "" });
    setQuantity(0);
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="heading">Cart Page</h1>
      </div>
      <div className="cart-container">
        {/* Selected Item */}
        <div className="card">
          <img
            src={selectedItem.imageUrl}
            alt={selectedItem.name}
            className="image"
          />
          <h3>{selectedItem.name}</h3>
          <p>Price: ₹{selectedItem.price * quantity}</p>

          {/* Quantity Selector */}
          <div className="quantity-container">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="btn"
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="btn">
              +
            </button>
          </div>
        </div>

        {/* User Details Form */}
        <div className="form-container">
          <h3>Enter Your Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userDetails.name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={userDetails.address}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleInputChange}
            className="input"
          />
          <button onClick={handleBuyNow} className="buy-btn">
            Buy Now
          </button>
        </div>
      </div>
      {showPopup && (
        <Popupmesg message={message} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default Cart;
