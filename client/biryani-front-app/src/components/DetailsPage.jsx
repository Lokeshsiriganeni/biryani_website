import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DetailsPage.css";
function DetailsPage() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [filteredData, setFilterdData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get_existing_users")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const filtereData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];
    return userData.filter(
      (u) =>
        u.user_name.toLowerCase().includes(term) ||
        u.mobile_num?.toLowerCase().includes(term)
    );
  }, [userData, searchTerm]);

  const addTransactionDetails = (user) => {
    navigate("/add-transaction", { state: user });
  };

  return (
    <>
      <div className="details-container">
        <h1>user details page</h1>
        <input
          type="text"
          placeholder="Search by name or mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filtereData.length === 0 && searchTerm && <p>No users found.</p>}

        {filtereData.map((user, index) => (
          <div
            key={index}
            className="user-card"
            onClick={() => addTransactionDetails(user)}
          >
            <p>{user.user_name}</p>
            <p>
              <img src={user.profile_img} alt="user" />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default DetailsPage;
