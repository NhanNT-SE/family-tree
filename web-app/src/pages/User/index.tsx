import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FT from "../../components/FT";
import { axiosClient } from "../../helpers/axios-client";

function User() {
  const [loading, setLoading] = useState<boolean>(false);
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const data: any = await axiosClient.get("/family-tree");
      setNodes(data);
    } catch (error: any) {
      console.log(error.response);
    }
  };
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    await axiosClient.post("/auth/sign-out");
    setLoading(false);
    navigate("/login");
  };
  return (
    <div style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Family Tree Management System </h1>
        <button style={{ marginLeft: "16px" }} onClick={logout}>
          Logout
        </button>
        {loading && <p>Logout ...</p>}
      </div>
      {nodes.length > 0 && <FT admin={false} nodes={nodes} />}
    </div>
  );
}

export default User;
