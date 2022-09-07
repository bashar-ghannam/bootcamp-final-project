import { Grid } from '@mui/material';
import React from 'react';
import { MealCard } from './MealCard';

function MealsTemplate({ meals }) {
  return (
    <div>
      <Grid container px={2} pt={1} pb={8}>
        {meals.map((meal, index) => (
          <Grid item xs={12} sx={{ mb: 2 }} key={index}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MealsTemplate;
