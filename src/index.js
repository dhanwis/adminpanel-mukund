import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import ErrorPage from "views/Errorss";
import Contextshareeee from "components/context/ContextShareeee";
import PrivateRoute from "components/context/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={<PrivateRoute element={AdminLayout} />}
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
