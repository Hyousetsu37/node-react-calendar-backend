/* 
    User routes / Auth
    host+/apu/auth
 */

const { Router } = require('express');
const {
  createUser,
  loginUser,
  revalidateToken,
} = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be at least 6 chatacters long').isLength(
      { min: 6 }
    ),
    fieldValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail().not().isEmpty(),
    check('password', 'Password should be at least 6 chatacters long').isLength(
      { min: 6 }
    ),
    fieldValidator,
  ],
  loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
