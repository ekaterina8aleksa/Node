const { verifyToken } = require('../services/tokenService');
const UserModel = require('../user/userSchema');

const checkAuthTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.status(401).send('No token provided');
        }
        const data = await verifyToken(token);
        req.userId = data.id;
        const userInfo = await UserModel.getUserById(data.id);

        req.user = {
        email: userInfo.email,
        id: userInfo._id,
        subscription: userInfo.subscription,
        };
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};

module.exports = { checkAuthTokenMiddleware };

