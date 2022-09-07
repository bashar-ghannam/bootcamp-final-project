const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const Meal = require('../models/meal');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

router.post('/user/:userId/favMeal', (request, response) => {
  const mealId = request.body.mealId;
  const userId = request.params.userId;
  User.findById(userId, function (err, user) {
    if (err) {
      response.status(400).json('Not found');
    }
    user.favMeals.push(mealId);
    user.save();
    response.status(200).json('Added');
  });
});

router.get('/user/:userId/favMeal', (request, response) => {
  const userId = request.params.userId;
  User.findOne({ _id: userId })
    .populate('favMeals')
    .exec(function (err, user) {
      if (err) {
        response.status(404).json('not found');
      } else {
        response.status(200).json(user.favMeals);
      }
    });
});

router.get('/restaurants', (request, response) => {
  Restaurant.find({}, function (err, meals) {
    if (err) {
      response.status(404).json('There is no items.');
    } else {
      response.status(200).json(meals);
    }
  });
});

router.get('/restaurants/:id', (request, response) => {
  const id = request.params.id;
  Restaurant.find({ _id: id })
    .populate('meals')
    .exec(function (err, meals) {
      if (err) {
        response.status(404).json('Restaurant not found');
      } else {
        response.status(200).json(meals);
      }
    });
});

router.get('/meals', (request, response) => {
  Restaurant.find({}, function (err, meals) {
    if (err) {
      response.status(404).json('There is no items.');
    } else {
      response.status(200).json(meals);
    }
  });
});

router.get('/popularMeals', (request, response) => {
  Meal.find({})
    .sort({ orderCounter: -1 })
    .limit(10)
    .exec(function (err, meals) {
      if (err) {
        response.status(404).json('Not found');
      } else {
        response.status(200).json(meals);
      }
    });
});

router.get('/meals/:id', (request, response) => {
  const id = request.params.id;
  Meal.findById(id, function (err, meal) {
    if (err) {
      response.status(404).json('Meal not found');
    } else {
      response.status(200).json(meal);
    }
  });
});

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, 'mySecretKey', {
    expiresIn: '50m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    'myRefreshSecretKey'
  );
};

router.post('/refresh', (request, response) => {
  const refreshToken = request.body.token;
  if (!refreshToken)
    return response.status(401).json('You are not authenticated!');
  if (!refreshTokens.includes(refreshToken)) {
    return response.status(403).json('Refresh Token is not valid!');
  }
  jwt.verify(refreshToken, 'myRefreshSecretKey', (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    response.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

router.post('/login', (request, response) => {
  const { username, password } = request.body;
  User.findOne({ username, password }, function (err, user) {
    if (err || user.length === 0) {
      response.status(400).send('Username or Password incorrect');
    } else {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      response.status(200).json({
        id: user._id,
        username: user.username,
        password: user.password,
        accessToken,
        refreshToken,
      });
    }
  });
});

const verify = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'mySecretKey', (err, user) => {
      if (err) {
        return response.status(403).json('Token is not valid!');
      }
      request.user = user;
      next();
    });
  } else {
    response.status(401).json('You are not authenticated!');
  }
};

router.post('/logout', verify, (request, response) => {
  const refreshToken = request.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  response.status(200).json('You logged out successfully.');
});

module.exports = router;
