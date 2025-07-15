import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config/appConfig";
import "./CreateRoom.css";

function CreateRoom() {
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
      newError.name = "Name is required";
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          `${serverEndpoint}/room`,
          { createdBy: name },
          { withCredentials: true }
        );
        const roomCode = response.data.roomCode;
        navigate(`/room/${roomCode}`);
      } catch (err) {
        console.error("Error creating room:", err);
        setError({ server: "Failed to create room. Please try again later." });
      }
    }
  };

  return (
    <div className="create-room-wrapper">
      {/* ❄️ Snowfall effect */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* 🎯 Glassmorphism Form Card */}
      <div className="form-card">
        <h2 className="text-center mb-4 text-glow">🏔️ Create Room</h2>
        <div className="mb-3">
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className={`input-glass form-control ${error.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <div className="invalid-feedback">{error.name}</div>}
        </div>

        <button className="btn-glow-submit w-100 mt-3" onClick={handleSubmit}>
          🚀 Create Now
        </button>

        {error.server && (
          <div className="alert alert-danger mt-3 text-center">
            {error.server}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
