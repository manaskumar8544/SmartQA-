import { useParams } from "react-router-dom";
import Question from "./Question";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import socket from "../config/socket";

function Room() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [room, setRoom] = useState(null);
  const [questions, setQuestions] = useState([]);

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
      const response = await axios.get(
        `${serverEndpoint}/room/${code}/question`,
        {
          withCredentials: true,
        }
      );
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

    // Emit join-room event to server using socket
    socket.emit("join-room", code);

    // Listen for new questions from server
    socket.on("new-question", (question) => {
      setQuestions((prev) => [question, ...prev]);
    });

    // React calls this returned function when the component unmount either due to
    // user closing the browser window or loosing the internet connection.
    // We'll use this to disconnect from new-question event.
    return () => {
      socket.off("new-question");
    };
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <p>Fetching room details...</p>
      </div>
    );
  }

  if (errors.message) {
    return (
      <div className="container text-center py-5">
        <p>{errors.message}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Room {code} created by {room.createdBy}</h2>
      <div className="row">
        <div className="col-auto">
          <ul className="list-group">
            {questions.map((question) => (
              <li key={question._id} className="list-group-item">
                {question.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row">
        <Question roomCode={code} />
      </div>
    </div>
  );
}

export default Room;
