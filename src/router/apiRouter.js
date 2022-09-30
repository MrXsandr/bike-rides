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

// Показать один маршрут
router.get('/routes/:route', async (req, res) => {
  const routeReviews = await Route.findOne({
    where: { id: req.params.route },
  });
  return res.json(routeReviews);
});

// Вывести список отзывов для данного маршрута
router.get('/routes/:route/reviews', async (req, res) => {
  const routeReviews = await Review.findAll({
    include: [{
      model: Route,
      where: { id: req.params.route },
    }],
  });
  return res.json(routeReviews);
});

export default router;
