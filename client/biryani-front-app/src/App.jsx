import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Home from "./components/Home"; // Ensure this path is correct
import { MenuProvider } from "./context/MenuContext";
import "./App.css"; // Keep CSS import last (best practice)
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailsPage from "./components/DetailsPage";
import AddTransactionPage from "./components/AddTransactionPage";
import Profile from "./components/Profile";

const App = () => {
  const [BackendData, setBackendData] = useState([{}]);

  useEffect(() => {
    // Fetch data from the backend using axios
    axios
      .get("/api")
      .then((response) => setBackendData(response.data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(BackendData);
  return (
    <GoogleOAuthProvider clientId="242680999955-r1l07k5jtgb088mev1kl4k647lhghq5t.apps.googleusercontent.com">
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/card"
              element={
                <ProtectedRoute>
                  <Card />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/details"
              element={
                <ProtectedRoute>
                  <DetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-transaction"
              element={
                <ProtectedRoute>
                  <AddTransactionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </MenuProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
