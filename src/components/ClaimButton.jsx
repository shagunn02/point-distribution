
import React from "react";
import axiosInstance from "../axiosConfig";

const ClaimButton = ({ userId, refreshLeaderboard }) => {
  const handleClaim = async () => {
    if (!userId) return alert("Select a user first!");
    const res = await axiosInstance.post(`/claim/${userId}`);
    alert(`${res.data.user.name} claimed ${res.data.points} points!`);
    refreshLeaderboard(); 
  };

  return <button onClick={handleClaim}>Claim Points</button>;
};

export default ClaimButton;
