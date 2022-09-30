import express from 'express';
import bcrypt from 'bcrypt';
import {
  User, Route, Like, Review,
} from '../../db/models';

const router = express.Router();

router.route('/auth/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('sid').sendStatus(200);
  });

router.route('/auth/registration')
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    if (name && password && email) {
      try {
        const user = await User.create({
          ...req.body, password: await bcrypt.hash(password, 10),
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

router.route('/auth/authorization')
  .post(async (req, res) => {
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

// Найти все маршруты
router.get('/routes', async (req, res) => {
  const routes = await Route.findAll();
  res.json(routes);
});

// Найти все маршруты одного пользователя
router.get('/myRoutes', async (req, res) => {
  console.log(req.session.user.id);
  const routes = await Route.findAll({
    where: { userid: req.session.user.id },
  });
  console.log('THIS IS FETCH FOR MY ROUTES---------->', routes);
  res.json(routes);
});

// Показать один маршрут
router.get('/routes/:route', async (req, res) => {
  const routeReviews = await Route.findOne({
    where: { id: req.params.route },
  });
  return res.json(routeReviews);
});
router.delete('/routes/:route', async (req, res) => {
  await Route.destroy({
    where: { id: req.params.route },
  });
  return res.sendStatus(200);
});

router.get('/routes/:route/reviews', async (req, res) => {
  const routeReviews = await Review.findAll({
    where: { routeid: req.params.route },
  });
  return res.json(routeReviews);
});

// Написать отзыв
router.post('/routes/:route/addReview', async (req, res) => {
  const { title, text } = req.body;
  const routeid = req.params.route;
  const userid = req.session.user.id;
  if (title && text) {
    try {
      const review = await Review.create({ ...req.body, routeid, userid });
      return res.json(review);
    } catch {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

// Создать новый маршрут
router.post('/newRoute', async (req, res) => {
  console.log(req.body);
  const {
    title, length, city, startX, startY, endX, endY,
  } = req.body;
  const userid = req.session.user.id;
  if (title && length && city) {
    try {
      const route = await Route.create({ ...req.body, userid });
      return res.json(route);
    } catch {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(401);
  }
});

export default router;
