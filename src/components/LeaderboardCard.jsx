
import React from "react";

const LeaderboardCard = ({ user, rank }) => {
  const crowns = {
    1: "👑",
    2: "🥈",
    3: "🥉",
  };
  const crown = crowns[rank] || "";

  return (
    <div className={`card rank-${rank}`}>
      <span className="rank-label">
        {crown} #{rank}
      </span>
      <span className="user-name">{user.name}</span>
      <span className="user-score">🔥 {user.totalPoints}</span>
    </div>
  );
};

export default LeaderboardCard;
