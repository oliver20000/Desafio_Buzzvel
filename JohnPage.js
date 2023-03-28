import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import axios from "axios";

function JohnPage() {
  const { userId = "" } = useRoute();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(userId); // verifique o valor de userId aqui
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3001/entries/${userId}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>LinkedIn: {user.linkedin}</p>
      <p>Github: {user.github}</p>
    </div>
  );
}

export default JohnPage;
