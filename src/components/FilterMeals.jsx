import React from 'react';
import MealsTemplate from './MealsTemplate/MealsTemplate';

function FilterMeals({ meals, filterName }) {
  return (
    <div>
      <h3 style={{ margin: '15px 0', paddingLeft: '20px' }}>
        {filterName} Meals :
      </h3>
      <MealsTemplate meals={meals} />
    </div>
  );
}

export default FilterMeals;
