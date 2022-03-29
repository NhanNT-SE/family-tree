/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../helpers/axios-client";
const RequireAuth = ({
  children,
  requireAdmin,
}: {
  children: JSX.Element;
  requireAdmin: boolean;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser();
  }, [navigate]);

  const getCurrentUser = async () => {
    const user: any = await axiosClient.get("/auth/current-user");
    if (
      (requireAdmin && user.permission !== 2) ||
      (!requireAdmin && user.permission !== 1)
    ) {
      navigate("/login");
    }
  };

  return children;
};
export default RequireAuth;
