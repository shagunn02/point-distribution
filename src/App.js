import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Leaderboard.css";

function App() {
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [historyLogs, setHistoryLogs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchLeaderboard = () => {
    axios
      .get("http://localhost:8000/api/leaderboard")
      .then((res) => setLeaderboardUsers(res.data))
      .catch((err) => console.error("Leaderboard fetch error:", err.message));
  };

  const fetchHistory = () => {
    axios
      .get("http://localhost:8000/api/history")
      .then((res) => setHistoryLogs(res.data))
      .catch((err) => console.error("History fetch error:", err.message));
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchHistory();
  }, []);

  const handleClaim = () => {
    if (!selectedUserId) return;
    axios
      .post(`http://localhost:8000/api/claim/${selectedUserId}`)
      .then((res) => {
        setClaimedPoints({
          name: res.data.user.name,
          points: res.data.claimedPoints,
        });
        fetchLeaderboard();
        fetchHistory();
      })
      .catch((err) => console.error("Claim failed:", err.message));
  };

  const handleAddUser = () => {
    if (!newUserName.trim()) return;
    axios
      .post("http://localhost:8000/api/users", { name: newUserName })
      .then(() => {
        setNewUserName("");
        fetchLeaderboard();
      })
      .catch((err) => console.error("Add user failed:", err.message));
  };

  const getRankLabel = (index) =>
    index === 0 ? "1st" : index === 1 ? "2nd" : "3rd";

  return (
    <div className="app-container">
      <h1 className="title">🔥 Points Distribution Leaderboard</h1>

      {/* Action bar */}
      <div className="action-bar">
        <div className="add-user">
          <input
            type="text"
            placeholder="Enter new user name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>

        <div className="claim-user">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {leaderboardUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={handleClaim} disabled={!selectedUserId}>
            Claim Points
          </button>
        </div>
      </div>

      {}
      {claimedPoints && (
        <div className="claim-feedback">
          <div className="avatar-wrapper">
            <img src="/default-avatar.jpg" alt="Avatar" className="avatar" />
          </div>
          🎯 {claimedPoints.name} claimed +{claimedPoints.points} pts!
        </div>
      )}

      {}
      <div className="top-three">
        {leaderboardUsers.slice(0, 3).map((user, index) => (
          <div className={`medal-card medal-${index + 1}`} key={user._id}>
            <div className="avatar-wrapper">
              <img src="/default-avatar.jpg" alt="Avatar" className="avatar" />
            </div>
            <div className="rank-label">{getRankLabel(index)}</div>
            <h3>{user.name}</h3>
            <p>{user.totalPoints} 🔥 pts</p>
          </div>
        ))}
      </div>

      {/* Remaining leaderboard */}
      {leaderboardUsers.length <= 3 ? (
        <p className="no-users">😢 No players beyond top 3</p>
      ) : (
        <ol className="leaderboard-list">
          {leaderboardUsers.slice(3).map((user, index) => (
            <li key={user._id} className="leaderboard-item">
              <div className="avatar-wrapper">
                <img
                  src="/default-avatar.jpg"
                  alt="Avatar"
                  className="avatar"
                />
              </div>
              <span>#{index + 4}</span>
              <span>{user.name}</span>
              <span>{user.totalPoints} 🔥</span>
            </li>
          ))}
        </ol>
      )}

      {}
      <button
        className="history-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        📜 {showHistory ? "Hide" : "View"} Claim History
      </button>

      {}
      {showHistory && (
        <div className="history-section">
          <h2>📜 Claim History Log</h2>
          <ul className="history-list">
            {historyLogs.length === 0 ? (
              <li className="history-item">No history yet 😐</li>
            ) : (
              historyLogs
                .filter((entry) => entry.userName && entry.claimedPoints)
                .map((entry) => (
                  <li key={entry._id} className="history-item">
                    <span>{entry.userName}</span>
                    <span>+{entry.claimedPoints} pts</span>
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
