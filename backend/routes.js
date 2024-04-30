const router = require('express').Router();

const authController = require('./controllers/auth-controller');
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const roomscontroller = require('./controllers/rooms-controller');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.activate); //this route should be server and protected
                                                           //becoz user already logged in on client and they have refresh token and access token
                                                           //on this route we have to access only those who have access token and we have to create middle ware before that                     
router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);
router.post('/api/rooms', authMiddleware, roomscontroller.create);
router.get('/api/rooms', authMiddleware, roomscontroller.index);

module.exports = router;