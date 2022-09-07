import React, { useEffect, useState } from 'react';
import { MealCard } from '../MealsTemplate/MealCard';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
import { TextField } from '@mui/material';
import MealsTemplate from '../MealsTemplate/MealsTemplate';

export default function Meals() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [searchRestaurant, setSearchRestaurant] = useState([]);

  useEffect(() => {
    const getRestaurant = async function () {
      let restaurantData = await axios.get(
        `http://localhost:4200/restaurants/${id}`
      );
      setRestaurant(restaurantData.data[0]);
      setIsLoading(true);
    };
    getRestaurant();
  }, []);

  useEffect(() => {
    let newSearchItem = { ...restaurant };
    if (Object.keys(newSearchItem).length !== 0) {
      newSearchItem = newSearchItem.meals.filter((meal) =>
        meal.name.includes(searchItem)
      );
      setSearchRestaurant(newSearchItem);
    }
  }, [searchItem]);

  return isLoading ? (
    <div>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <TextField
          type="text"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
          id="outlined-basic"
          label="Search specific meal ..."
          variant="outlined"
          sx={{ width: '96%' }}
        />
      </div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>
        {restaurant.name} Menu :
      </h3>
      {searchItem === '' ? (
        restaurant.meals.length > 0 ? (
          <MealsTemplate meals={restaurant.meals} />
        ) : (
          <h5 style={{ margin: '20px' }}>No meals added yet!</h5>
        )
      ) : (
        <div>
          <Grid container px={2} pt={1} pb={8}>
            {searchRestaurant.map((meal, index) => (
              <Grid item xs={12} sx={{ mb: 2 }} key={index}>
                <MealCard meal={meal} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
