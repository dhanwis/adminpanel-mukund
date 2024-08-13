import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import Contextshareeee from "components/context/ContextShareeee";
import { isauthtokencontext } from "components/context/ContextShareeee";
import ErrorPage from "views/Errorss";

const App = () => {
  const { authtoken, setauthtoken } = useContext(isauthtokencontext);

  // Check sessionStorage for token on app load
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setauthtoken(true);
    }
  }, [setauthtoken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={authtoken ? <AdminLayout /> : <Navigate to="/login" replace />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Contextshareeee>
    <App />
  </Contextshareeee>
);
