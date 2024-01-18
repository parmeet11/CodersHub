const router = require('express').Router();

const authController = require('./controllers/auth-controller');
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.activate); //this route should be server and protected
                                                           //becoz user already logged in on client and they have refresh token and access token
                                                           //on this route we have to access only those who have access token and we have to create middle ware before that                     


module.exports = router;