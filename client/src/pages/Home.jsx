import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-wrapper">
      <div className="glass-card animate-fade-in">
        <h1 className="heading">🚀 Welcome to SmartQA</h1>
        <p className="subtitle">
          Host or join smart Q&A sessions in real time with collaborative features and an intelligent interface.
        </p>
        <p className="subtext">
          🔐 Ask for a room code to join an ongoing session, or create your own with a click.
        </p>

        <div className="button-group">
          <Link to="/create" className="btn-glow blue">➕ Create Room</Link>
          <Link to="/join" className="btn-glow green">🔗 Join Room</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
