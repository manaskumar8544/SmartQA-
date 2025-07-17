// Room.jsx
import { useParams } from "react-router-dom";
import Question from "./Question";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import socket from "../config/socket";
import './Room.css';

function Room() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [room, setRoom] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [summarise, setSummarise] = useState([]);


  const fetchSummary = async () => {
    try {
        const response = await axios.get(`${serverEndpoint}/room/${code}/question/summarize`, {
          withCredentials: true,
      });
      setSummarise(response.data || []);
    } catch (error) {
      console.log(error);
      setErrors({message: "Unable to fetch top questions, please try again"});
    }
};

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/room/${code}`, {
        withCredentials: true,
      });
      setRoom(response.data);
    } catch (error) {
      console.log(error);
      setErrors({
        message: "Unable to fetch room details, please try again",
      });
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/room/${code}/question`, {
        withCredentials: true,
      });
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
      setErrors({
        message: "Unable to fetch questions, please try again",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRoom();
      await fetchQuestions();
      setLoading(false);
    };

    fetchData();

    // Join room via socket
    socket.emit("join-room", code);

    // Listen for real-time question updates
    socket.on("new-question", (question) => {
      setQuestions((prev) => [question, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("new-question");
    };
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5 fade-in">
        <p>Loading room details...</p>
      </div>
    );
  }

  if (errors.message) {
    return (
      <div className="container text-center py-5 fade-in">
        <p>{errors.message}</p>
      </div>
    );
  }

  return (
    <>
      {/* Background Effects */}
      <div className="rain-effect"></div>
      <div className="cloud-float"></div>

      <div className="container py-5 fade-in" >
        <h2 className="room-title mb-4 animate-heading">
          🚪 Room <span className="highlight">{code}</span> created by <span className="creator">{room.createdBy}</span>
        </h2>
      <button className="btn btn-outline-success" onClick={fetchSummary}>
        Get Top Questions
      </button>
      <hr />
      {summarise.length > 0 && (
        <div className="mt-2">
          <h5>Top Questions Asked</h5>
          <ul>
            {summarise.map((sum, i) => (
              <li key={i}>{sum}</li>
            ))}
          </ul>
        </div>
      )}


        <div className="row">
          <div className="col-md-7">
            <div className="question-list">
              {questions.map((question) => (
                <div key={question._id} className="question-card">
                  <p>{question.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-5">
            <Question roomCode={code} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
