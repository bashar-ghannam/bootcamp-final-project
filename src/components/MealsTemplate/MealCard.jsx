import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link } from 'react-router-dom';

export const MealCard = ({ meal }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100%"
            image={require(`../../assets/${meal.img}`)}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent sx={{ p: 0, pt: 1, pb: 0 }}>
            <Link
              to={`/meal/${meal._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography gutterBottom variant="h6" component="div">
                {meal.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <span>
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={meal.ratingSum / meal.ratingCounter}
                    readOnly
                  />
                </span>
                <span>({meal.ratingCounter} Reviews)</span>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} my={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>
                    <ThumbUpIcon />
                  </span>
                  <span>{meal.likes} Like</span>
                </Stack>
                <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                  ₪{meal.price}/Person
                </Typography>
              </Stack>
            </Link>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" alignItems="center">
                <span>
                  <FastfoodIcon />
                </span>
                <span>{meal.type}</span>
              </Stack>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
