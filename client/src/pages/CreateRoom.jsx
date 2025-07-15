import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverEndpoint  } from "../config/appConfig";

function CreateRoom() {
  const [name, setName] = useState(null);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};
    let isValid = true;

    if (name.length === 0) {
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
          `${serverEndpoint }/room`,
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
    <div className=" container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Create Room</h2>
          <div className="mb-3">
          
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className={
                error.name ? "form-control is-invalid" : "form-control"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="btn btn-primary w-100"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
