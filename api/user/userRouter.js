const {Router} = require('express');

const {getCurrentUserController, uploaderAvatarController} = require('./userController');

const {checkAuthTokenMiddleware} = require ('../middleware/authMiddleware.js');

const {avatarUploaderMiddleware} = require ('../middleware/fileUploaderMiddleware');

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

usersRouter.post("/avatars", checkAuthTokenMiddleware,  avatarUploaderMiddleware, uploaderAvatarController);

module.exports = usersRouter;