import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MealsTemplate from '../MealsTemplate/MealsTemplate';

function PopularMeals() {
  const [popularMeals, setPopularMeals] = useState([]);
  useEffect(() => {
    const getPopularMeals = async function () {
      let popular = await axios.get('http://localhost:4200/popularMeals');
      setPopularMeals(popular.data);
    };
    getPopularMeals();
  }, []);

  return (
    <div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>Popular Meal : </h3>
      <MealsTemplate meals={popularMeals} />
    </div>
  );
}

export default PopularMeals;
