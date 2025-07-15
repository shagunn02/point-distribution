import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

const AddUser = ({ refreshUsers }) => {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return alert("Please enter a valid name.");
    try {
      await axiosInstance.post("/users", { name });
      setName("");
      refreshUsers();
    } catch (err) {
      alert("Error adding user.");
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
};

export default AddUser;
