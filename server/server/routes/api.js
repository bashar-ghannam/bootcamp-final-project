const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
// const Transaction = require('../model/Transaction');

const users = [
  {
    id: 1,
    username: 'bashar',
    password: 'bashar',
  },
  {
    id: 2,
    username: 'anwar',
    password: 'anwar',
  },
];

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, 'mySecretKey', {
    expiresIn: '5s',
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
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    response.status(200).json({
      username: user.username,
      password: user.password,
      accessToken,
      refreshToken,
    });
  } else {
    response.status(400).send('Username or Password incorrect');
  }
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

router.delete('/user/:userId', verify, (request, response) => {
  const user = request.user;
  if (user.id === parseInt(request.params.userId) || user.isAdmin) {
    response.status(200).json('User has been deleted.');
  } else {
    response.status(403).json('You are not allowed to delete this user!');
  }
});

module.exports = router;
