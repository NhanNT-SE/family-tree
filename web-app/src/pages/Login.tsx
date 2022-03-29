import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../helpers/axios-client";

function LoginPage() {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("admin");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      const user: any = await axiosClient.post("/auth/sign-in", {
        username,
        password,
      });
      setLoading(false);
      if (user.permission > 1) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setError(JSON.stringify(error.response.data.errors));
      }
      setLoading(false);
    } 
  };
  return (
    <div>
      <h3>Login page</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        readOnly
        placeholder="username"
        autoComplete="new-password"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onFocus={(event) => {
          event.target.removeAttribute("readonly");
        }}
      />
      <br />
      <input
        type="password"
        readOnly
        placeholder="password"
        style={{ margin: "16px 0" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={(event) => {
          event.target.removeAttribute("readonly");
        }}
      />
      <br />
      <button onClick={submit}>Submit</button>
      {loading && <h4>Loading ...</h4>}
    </div>
  );
}

export default LoginPage;
