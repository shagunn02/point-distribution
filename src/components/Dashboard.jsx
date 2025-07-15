import React, { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/leaderboard")
      .then((res) => setLeaderboardUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Leaderboard users={leaderboardUsers} />
    </div>
  );
};

export default Dashboard;
