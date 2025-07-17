import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

import './Question.css';

function Question({ roomCode }) {
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (question.trim().length === 0) {
      isValid = false;
      newErrors.question = "Question is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const participantName = localStorage.getItem("participant-name") || "Anonymous";
        await axios.post(
          `${serverEndpoint}/room/${roomCode}/question`,
          {
            content: question,
            user: participantName,
          },
          { withCredentials: true }
        );
        setQuestion("");
      } catch (error) {
        console.error(error);
        setErrors({ message: "Error posting question, please try again" });
      }
    }
  };

  return (
    <div className="row py-3">
      <div className="col-md-5">
        <h5 className="mb-2">💬 Ask a Question</h5>
        <div className="mb-2">
          <label htmlFor="question" className="form-label visually-hidden">Question</label>
          <textarea
            id="question"
            name="question"
            className={`form-control ${errors.question ? "is-invalid" : ""}`}
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here"
          />
          {errors.question && <div className="invalid-feedback">{errors.question}</div>}
        </div>

        <div className="mb-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-success w-100"
          >
            🚀 Submit Question
          </button>
        </div>

        {errors.message && (
          <div className="alert alert-danger text-center">
            {errors.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
