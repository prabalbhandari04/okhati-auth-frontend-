import { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("https://okhati-backend.herokuapp.com/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>{privateData}
    <div>
    <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
    </div>
    </div>
    
  );
};

export default PrivateScreen;
