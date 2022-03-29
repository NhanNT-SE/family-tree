import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import RequireAuth from "./components/RequireAuth";
import Admin from "./pages/Admin";
import FamilyTree from "./pages/Admin/FamilyTree";
import Users from "./pages/Admin/Users";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="admin"
        element={
          <RequireAuth requireAdmin={true}>
            <Admin />
          </RequireAuth>
        }
      >
        <Route index element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="family-tree" element={<FamilyTree />} />
        <Route path="*" element={<Navigate replace to="" />} />
      </Route>
      <Route
        path="user"
        element={
          <RequireAuth requireAdmin={false}>
            <User />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate replace to="home" />} />
    </Routes>
  );
}

export default App;
