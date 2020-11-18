const {
  index,
  show,
  create,
  update,
  destroy
} = require('../controllers/users');

module.exports = (router) => {
  router.get('/user', index);
  router.get('/users/:id', show);
  router.post('/users', create);
  router.post('/users/update', update);
  router.post('/users/destroy', destroy);

  return router;
};