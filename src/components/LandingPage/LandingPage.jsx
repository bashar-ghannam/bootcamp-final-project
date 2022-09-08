import React, { useEffect, useState } from 'react';
import MealType from './MealType';
import Restaurants from './Restaurants';
import './Landing.css';
import axios from 'axios';
import PopularMeals from './PopularMeals';

function LandingPage({ FilterMeals }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      let newRestaurants = await axios.get('http://localhost:4200/restaurants');
      setRestaurants(newRestaurants.data);
    };
    getRestaurants();
  }, []);

  return (
    <div className="landing">
      <Restaurants restaurants={restaurants} />
      <MealType FilterMeals={FilterMeals} />
      <PopularMeals />
    </div>
  );
}

export default LandingPage;
