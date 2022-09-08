import React, { useEffect, useState } from 'react';
import './mealDetail.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

function MealDetails({ CartStore, addToFav }) {
  const [meal, setMeal] = useState({});
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let { id } = useParams();
  const getMeal = async function () {
    let mealData = await axios.get(`http://localhost:4200/meals/${id}`);
    setMeal(mealData.data);
    setIsLoding(true);
  };

  useEffect(() => {
    getMeal();
  }, []);

  const handleClick = function () {
    addToFav(meal._id);
  };

  return isLoding ? (
    <div>
      <div
        className="mealImg"
        style={{
          backgroundImage: `url(${require(`../../assets/${meal.img}`)} )`,
        }}
      >
        <div className="backIcon" onClick={() => navigate(-1)}>
          <ArrowBackIosIcon fontSize="large" />
        </div>
        <div className="favIcon" onClick={handleClick}>
          <FavoriteIcon fontSize="large" />
        </div>
      </div>
      <div className="mealContent">
        <div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {meal.name}
          </Typography>
          <Stack direction="row" spacing={1} pb={1}>
            <Rating
              name="hover-feedback"
              value={ratingValue}
              precision={0.5}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
            <span>
              {Number((meal.ratingSum / meal.ratingCounter).toFixed(1))} (
              {meal.ratingCounter} Reviews)
            </span>
          </Stack>
          <Stack direction="row" spacing={2} my={1}>
            <Stack direction="row" spacing={1}>
              <span>
                <AccessTimeIcon />
              </span>
              <span>
                Total Time :{' '}
                <span style={{ fontWeight: 'bold' }}>{meal.cookingTime}m</span>
              </span>
            </Stack>
            <Stack direction="row" spacing={1}>
              <span>
                <LocalFireDepartmentIcon />
              </span>
              <span>
                Calories :{' '}
                <span style={{ fontWeight: 'bold' }}>{meal.calories}</span>
              </span>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} py={1}>
            <Stack direction="row" spacing={1}>
              <span>
                <ThumbUpOffAltIcon />
              </span>
              <span>{meal.likes} Like</span>
            </Stack>
            <Typography variant="span" sx={{ fontWeight: 'bold' }}>
              ₪{meal.price}/Person
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1}>
              <span>
                <FastfoodIcon />
              </span>
              {meal.category.map((c, index) => (
                <span key={index}>{c} ,</span>
              ))}
            </Stack>
          </Stack>
        </div>
        <hr />
        <div>
          <Typography
            gutterBottom
            variant="div"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            Description :
          </Typography>
          {showMore
            ? meal.description
            : `${meal.description.substring(0, 150)}`}
          <span onClick={() => setShowMore(!showMore)} style={{ color: 'red' }}>
            {showMore ? ' Show less' : ' Show more...'}
          </span>
        </div>

        <div>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ fontWeight: 'bold', mt: 2 }}
          >
            Sensitivity section :
          </Typography>
          <ul className="mealDetailsList">
            {meal.sensitivity.map((sensitivity, index) => {
              return (
                Object.values(sensitivity)[0] && (
                  <li key={index}>{Object.keys(sensitivity)[0]}</li>
                )
              );
            })}
          </ul>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              backgroundColor: '#ff9800',
              fontSize: 12,
              my: 1,
            }}
            onClick={() => {
              CartStore.addIeam(meal.name, meal.price, meal.img);
            }}
          >
            Add to Order
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default inject('CartStore')(observer(MealDetails));
