import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { AppBar, Toolbar } from "@material-ui/core";
import "./MealDetails.css";
import CardMedia from "@material-ui/core/CardMedia";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Button from "@material-ui/core/Button";
import Rating from "@mui/material/Rating";

export default function MealDetails() {
  const [value] = React.useState(1.5);

  return (
    <div id="div">
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <IconButton id="iconToEnd">
            <FavoriteBorderIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <CardMedia
        className="media"
        image="https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lYWx8ZW58MHx8MHx8&w=1000&q=80"
      />

      <h2> Meal Name</h2>
      <Typography className="rating">
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          value={value}
          precision={0.5}
          size="small"
          readOnly
        />
        <>19 reviews</>
      </Typography>

      <div id="forFont">
        <IconButton>
          <FastfoodIcon />
          Lunch
        </IconButton>
        <IconButton>
          <ThumbUpAltIcon /> 42 Like
        </IconButton>
        <Typography id="nth">
          <AttachMoneyIcon />
          19/Person
        </Typography>
      </div>
      <hr />
      <Typography variant="body2" color="textSecondary" component="p">
        components bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
        bla bla bla bla bla bla
      </Typography>
      <Button variant="contained" id="btn">
        Order Now
      </Button>

      {/*<Rating name="half-rating-read" defaultValue={2.5} value={value} precision={0.5} size="small" readOnly />  */}
    </div>
  );
}
