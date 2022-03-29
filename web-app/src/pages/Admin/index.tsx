import React, { useState } from "react";
import "./style.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { axiosClient } from "../../helpers/axios-client";

function Admin() {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true)
    await axiosClient.post("/auth/sign-out");
    setLoading(false)
    navigate("/login");
  };
  return (
    <div className="admin-wrapper">
      <h3>
        Admin Page <button onClick={logout}>Logout</button>
      </h3>
      {loading && <p>Logout ...</p>}

      <nav>
        <Link to="/admin/users">User List</Link>
        <Link to="/admin/family-tree">FTS</Link>
        <Link to="/admin/family-tree">User Management</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Admin;
