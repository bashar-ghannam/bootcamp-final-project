import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Meal from "./components/Meal";
import LandingPage from "./components/LandingPage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AiFillChrome } from "react-icons/ai";
import Navbar from "./components/Navbar";
import MealDetails from "./components/MealDetail/MealDetails";

function App() {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:4200/refresh", {
        token: user.refreshToken,
      });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async function (username, password) {
    try {
      const res = await axios.post("http://localhost:4200/login", {
        username,
        password,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async function () {
    try {
      await axiosJWT.post(
        "http://localhost:4200/logout",
        {},
        {
          headers: { authorization: "Bearer " + user.accessToken },
        }
      );

      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <AiFillChrome />
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/meal">meal</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/login"
          element={<Login login={login} logout={logout} user={user} />}
        />
        <Route
          path="/meal"
          element={
            <ProtectedRoute user={user}>
              <Meal />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<MealDetails />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <Navbar user={user} logout={logout} />
    </div>
  );
}

export default App;
