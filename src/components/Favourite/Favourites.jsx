import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import MealsTemplate from '../MealsTemplate/MealsTemplate';

function Favourites({ favMeals }) {
  return (
    <div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>Favourites :</h3>
      <MealsTemplate meals={favMeals} />
    </div>
  );
}

export default Favourites;
