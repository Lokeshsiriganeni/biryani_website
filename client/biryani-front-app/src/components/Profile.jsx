import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [openCamera, setCamera] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  const videoConstraints = {
    facingMode: { exact: facingMode },
  };

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return alert("Failed to capture image.");
    setImage(imageSrc);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const toggleCameraStatus = () => {
    setCamera((prev) => !prev);
  };

  const addDetails = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please capture an image.");

    const blob = await (await fetch(image)).blob();
    const formData = new FormData();
    console.log("blob img" + blob);
    formData.append("name", userData.name);
    formData.append("address", userData.address);
    formData.append("mobile", userData.mobile);
    formData.append("image", blob, "captured.jpg");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      console.log("Uploaded successfully: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="input-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Enter Name"
            onChange={addDetails}
            required
          />
        </label>
        <label>
          Address:
          <input
            placeholder="Enter Address"
            name="address"
            type="text"
            value={userData.address}
            onChange={addDetails}
            required
          />
        </label>
        <label>
          Mobile:
          <input
            placeholder="Enter Mobile"
            type="tel"
            name="mobile"
            value={userData.mobile}
            onChange={addDetails}
            required
          />
        </label>
        <button type="button" onClick={toggleCameraStatus}>
          Camera
        </button>
      </div>

      {!openCamera ? (
        <div>
          {!image ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                videoConstraints={videoConstraints}
              />
              <div style={{ marginTop: "10px" }}>
                <button type="button" onClick={capture}>
                  Capture
                </button>
                <button
                  type="button"
                  onClick={toggleCamera}
                  style={{ marginLeft: "10px" }}
                >
                  Switch Camera
                </button>
              </div>
            </>
          ) : (
            <div>
              <img src={image} alt="Captured" width={320} />
              <div>
                <button type="button" onClick={() => setImage(null)}>
                  Retake
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div style={{ marginTop: "20px" }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Profile;
