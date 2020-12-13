const {Router} = require('express');
const { registrationController, loginController,logoutController } = require('./authController');
const { registrationAndLoginValidatorMiddleware} = require('../auth/authValidator')
const authRouter = Router();

authRouter.post('/registration', registrationAndLoginValidatorMiddleware, registrationController);
authRouter.post('/login', registrationAndLoginValidatorMiddleware, loginController);
authRouter.post('/logout', logoutController);

module.exports = authRouter;