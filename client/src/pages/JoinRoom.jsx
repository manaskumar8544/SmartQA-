import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (name.trim().length === 0) {
      isValid = false;
      newErrors.name = "Name is mandatory";
    }

    if (roomCode.trim().length === 0) {
      isValid = false;
      newErrors.roomCode = "Room Code is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      localStorage.setItem("participant-name", name);
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h2 className="mb-4 text-center">🎯 Join Room</h2>

          {/* Name Input */}
          <div className="mb-3">
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Room Code Input */}
          <div className="mb-3">
            <input
              type="text"
              id="roomCode"
              name="roomCode"
              className={`form-control ${errors.roomCode ? "is-invalid" : ""}`}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter room code"
            />
            {errors.roomCode && <div className="invalid-feedback">{errors.roomCode}</div>}
          </div>

          {/* Submit Button */}
          <div className="mb-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success w-100"
            >
              ✅ Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
