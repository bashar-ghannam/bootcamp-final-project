import { Grid } from '@mui/material';
import React from 'react';
import Restaurant from './Restaurant';

export default function Restaurants({ restaurants }) {
  return (
    <div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>Restaurants :</h3>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {restaurants.map((restaurant, index) => (
          <Grid item xs={12} key={index}>
            <Restaurant restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
