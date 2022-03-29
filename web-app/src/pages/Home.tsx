import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <h1>
      Welcome to Family Tree System. Please{" "}
      <Link to="/login">Login</Link>{" "} to continue.
    </h1>
  );
}

export default Home;
