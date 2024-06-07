// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "./app/redux/auth/authSlice";
import { AppRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
