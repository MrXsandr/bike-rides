import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Layout', {});
});
router.get('/addmap', (req, res) => {
  res.render('Layout', {});
});
router.get('/map', (req, res) => {
  res.render('Layout', {});
});
export default router;
