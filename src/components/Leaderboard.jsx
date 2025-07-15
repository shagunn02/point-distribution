
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

const Leaderboard = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("/users/leaderboard").then((res) => setUsers(res.data));
  }, [refreshTrigger]); 

  return (
    <div>
      <h3>Leaderboard</h3>
      <ol>
        {users.map((user, index) => (
          <li key={user._id}>
            #{index + 1} {user.name} - {user.totalPoints} pts
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
