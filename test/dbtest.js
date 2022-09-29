const {
  User, Route, Like, Review,
} = require('../db/models');

const fs = require('fs').promises;
const sequelize = require('sequelize');

const sortRouts = Like.count({
  attributes: ['routeid'],
  group: ['routeid'],
  include: [{ model: Route }],
}).then((res) => JSON.parse(JSON.stringify(res))).then((res) => console.log(...res));