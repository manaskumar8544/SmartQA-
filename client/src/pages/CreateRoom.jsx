import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config/appConfig";
import "./CreateRoom.css";

function CreateRoom() {
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: null, server: null });
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
      newError.name = "Name is required";
    }

    setError({ ...error, ...newError });
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
        setError({ ...error, server: "Failed to create room. Please try again later." });
      }
    }
  };

  return (
    <div className="simple-room-wrapper">
      <div className="form-card">
        <h2 className="form-title">🧠 Create Room</h2>
        <div className="mb-3">
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter your name"
            className={`form-control simple-input ${error.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <div className="invalid-feedback">{error.name}</div>}
        </div>
        <button className="simple-btn w-100" onClick={handleSubmit}>
          Create Now
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
