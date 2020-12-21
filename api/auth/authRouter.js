const {Router} = require('express');
const {registrationController, loginController,logoutController } = require('./authController');
const {registrationValidatorMiddleware, loginValidatorMiddleware} = require('../auth/authValidator');
const {checkAuthTokenMiddleware } = require('../middleware/authMiddleware')
const authRouter = Router();

authRouter.post('/registration', registrationValidatorMiddleware, registrationController);
authRouter.post('/login', loginValidatorMiddleware, loginController);
authRouter.post('/logout',checkAuthTokenMiddleware, logoutController);

module.exports = authRouter;