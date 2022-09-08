import React, { useEffect, useState } from 'react';
import { GiHamburger } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { FaPizzaSlice } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import { GiCakeSlice } from 'react-icons/gi';
import { BsEggFried } from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import axios from 'axios';
import FilterMeals from '../FilterMeals';

export default function MealType() {
  const [filter, setFilter] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterMeals, setFilterMeals] = useState([]);

  useEffect(() => {
    if (filter !== '') {
      const getFilterMeals = async () => {
        let meals = await axios.get(`http://localhost:4200${filter}`);
        setFilterMeals(meals.data);
      };
      getFilterMeals();
    }
  }, [filter]);

  const mealsFilter = [
    {
      name: 'Break fast',
      url: '/meal/category/break fast',
      img: <BsEggFried size="50" />,
    },
    {
      name: 'Lunch',
      url: '/meal/category/lunch',
      img: <FaPizzaSlice size="40" />,
    },
    {
      name: 'Dinner',
      url: '/meal/category/dinner',
      img: <GiHamburger size="50" />,
    },
    {
      name: 'Desart',
      url: '/meal/type/dessert',
      img: <GiCakeSlice size="50" />,
    },
    {
      name: 'Drinks',
      url: '/meal/type/drink',
      img: <BiDrink size="50" />,
    },
    {
      name: 'Healthy food(vegean)',
      url: '/meal/vegan',
      img: <GiFruitBowl size="50" />,
    },
  ];

  return (
    <div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>Meal type :</h3>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          px={3}
        >
          {mealsFilter.map((filter, index) => (
            <Grid
              item
              xs={3}
              sx={{ textAlign: 'center' }}
              key={index}
              onClick={() => {
                setFilter(filter.url);
                setFilterName(filter.name);
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  mb: 1,
                  backgroundColor: '#fafafa',
                  color: '#ff9800',
                }}
              >
                {filter.img}
              </Avatar>
              <span>{filter.name}</span>
            </Grid>
          ))}
        </Grid>
      </div>
      {filter !== '' && (
        <FilterMeals meals={filterMeals} filterName={filterName} />
      )}
    </div>
  );
}
