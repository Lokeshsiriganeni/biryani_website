import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
// const cookieParser = require("cookie-parser");

import axios from "axios";
import "./Login.css";
function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/google",
            {
              token: credential,
            }
          );

          const data = await res;

          console.log(data.data.jwt);
          if ((res.statusText = "OK")) {
            localStorage.setItem("authToken", data.jwt); // your backend token
            console.log("Logged in with backend JWT:", data.data.jwt);
          } else {
            console.error("Backend auth failed", data);
          }
        } catch (err) {
          console.error("Request failed", err);
        }
        const decoded = jwtDecode(credential);

        if (decoded) {
          console.log("User Info:", decoded);
          const res = await axios.post("/api/userDetails", {
            data: decoded,
          });
        }
        // { name, email, picture, etc. }

        // Optional: Store user info in localStorage
        // localStorage.setItem("user", JSON.stringify(decoded));

        // Optional: navigate after login

        navigate("/Home");
      }
    } catch (err) {
      console.error("Error decoding token", err);
    }
  };

  return (
    <>

      <div className="loginPage">
        
      </div>

      <div className="authPage">
        <div className="authCard">
          <h1>Sign in 👋</h1>
          <p>Please sign in using your Google account</p>
          <div className="google-button-wrapper">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
