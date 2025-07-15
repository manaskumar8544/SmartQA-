import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center py-5">
      <h2 className="mb-4">SmartQA - Get Started!</h2>
      <p className="mb-2">
        SmartQA is a platform that allows you to create and join rooms for collaborative question-answering sessions. 
        You can create a room to host a session or join an existing room to participate in discussions.
      </p>
      <p className="mb-4">
        If you want to participate, then click on the Join Room.
        Ask for room code from the host of the meeting.
      </p>
      <Link to="/create" className="btn btn-primary mx-3">Create Room</Link>
      <Link to="/join" className="btn btn-success mx-3">Join Room</Link>
    </div>
  );
}

export default Home;
