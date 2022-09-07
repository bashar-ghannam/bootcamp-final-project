import React from 'react';
import { GiHamburger } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { FaPizzaSlice } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import { GiCakeSlice } from 'react-icons/gi';
import { BsEggFried } from 'react-icons/bs';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

export default function MealType() {
  const mealsFilter = [
    {
      name: 'Break fast',
      img: <BsEggFried size="50" />,
    },
    {
      name: 'Lunch',
      img: <FaPizzaSlice size="40" />,
    },
    {
      name: 'Dinner',
      img: <GiHamburger size="50" />,
    },
    {
      name: 'Desart',
      img: <GiCakeSlice size="50" />,
    },
    {
      name: 'Drinks',
      img: <BiDrink size="50" />,
    },
    {
      name: 'Healthy food',
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
            <Grid item xs={3} sx={{ textAlign: 'center' }} key={index}>
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  mb: 1,
                  backgroundColor: '#fafafa',
                  color: '#ffb300',
                }}
              >
                {filter.img}
              </Avatar>
              <span>{filter.name}</span>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
