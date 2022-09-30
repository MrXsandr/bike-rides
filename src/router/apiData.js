import express from 'express';
import bcrypt from 'bcrypt';

import {
  User, Route, Like, Review,
} from '../../db/models';

const router = express.Router();

// Найти все маршруты
router.get('/', async (req, res) => {
  const routes = await Route.findAll();
  res.json(routes);
});

// Сортировать маршруты по количеству лайков
router.get('/', async (req, res) => {
  const sortRouts = await Route.findAll({
    include: [{
      model: Like,
      where: { routeid: req.params.id }, // ???????????????????
    }],
    order: [['id', 'DESC']],
  });
  res.json(sortRouts);
});

// Создать пользователя (регистрация нового пользователя)
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    try {
      const user = await User.create({
        ...req.body, password: await bcrypt.hash(password, 5),
      });
      const currUser = { id: user.id, name: user.name };
      req.session.user = currUser;
      return res.json(currUser);
    } catch {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// Проверить наличие пользователя (аутентификация)
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const currUser = { id: user.id, name: user.name };
      req.session.user = currUser;
      return res.json(currUser);
    }
    return res.sendStatus(401);
  }
  return res.sendStatus(401);
});

// Вывести список маршрутов пользователя
router.get('/', async (req, res) => {
  const userRoutes = await Route.findAll({
    include: [{
      model: User,
      where: { id: req.session.user.id },
    }],
  });
  return res.json(userRoutes);
});

// Создать новый маршрут
router.post('/', async (req, res) => {
  const { title, length, city } = req.body;
  if (title && length && city) {
    try {
      const route = await Route.create({ ...req.body });
      return res.json(route);
    } catch {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// Написать отзыв
router.post('/', async (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    try {
      const review = await Review.create({ ...req.body });
      return res.json(review);
    } catch {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// Вывести список отзывов для данного маршрута
router.get('/', async (req, res) => {
  const routeReviews = await Review.findAll({
    include: [{
      model: Route,
      where: { id: req.params.id },
    }],
  });
  return res.json(routeReviews);
});

export default router;
