import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage/LandingPage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Navbar from './components/Navbar';
import MealDetails from './components/MealDetail/MealDetail';
import Meals from './components/Meals/Meals';
import ErrorPage from './components/ErrorPage';
import Cart from './components/Cart/Cart';
import Favourites from './components/Favourite/Favourites';
import { observer, inject } from 'mobx-react';

function App({ CartStore }) {
  const [user, setUser] = useState(null);
  const [favCount, setFavCount] = React.useState(0);
  const [favMeals, setFavMeals] = useState([]);


  const getFav = async function (id) {
    let meals = await axios.get(`http://localhost:4200/user/${id}/favMeal`);
    setFavMeals(meals.data);
    setFavCount(meals.data.length);
  };

  const addToFav = async (id) => {
    await axios.post(`http://localhost:4200/user/${user.id}/favMeal`, {
      mealId: id,
    });
    getFav(user.id);
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post('http://localhost:4200/refresh', {
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
        config.headers['authorization'] = 'Bearer ' + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async function (username, password) {
    try {
      const res = await axios.post('http://localhost:4200/login', {
        username,
        password,
      });
      setUser(res.data);
      getFav(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async function () {
    try {
      await axiosJWT.post(
        'http://localhost:4200/logout',
        {},
        {
          headers: { authorization: 'Bearer ' + user.accessToken },
        }
      );
      setUser(null);
      setFavCount(0);
      CartStore.emptyCart();
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
      <div className="header">
        <h2>Q-Food Order</h2>
      </div>
      <Routes>
        <Route
          path="/login"
          element={<Login login={login} logout={logout} user={user} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/restaurants/:id`}
          element={
            <ProtectedRoute user={user}>
              <Meals />
            </ProtectedRoute>
          }
        />

        <Route
          path={`/meal/:id`}
          element={
            <ProtectedRoute user={user}>
              <MealDetails addToFav={addToFav} />
            </ProtectedRoute>
          }
        />

        <Route
          path={`/favMeals`}
          element={
            <ProtectedRoute user={user}>
              <Favourites favMeals={favMeals} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Navbar user={user} logout={logout} favCount={favCount} />
    </div>
  );
}

export default inject('CartStore')(observer(App));
