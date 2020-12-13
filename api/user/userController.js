// const PORT = process.env.PORT || 3000;
const UserModel = require('./userSchema');

const getCurrentUserController = async (req, res, next) => {
    try {
        const {email}  = req.body;
        const getUserByEmail = await UserModel.findOne({email});
        if (!getUserByEmail) 
        return res
            .status(401)
            .json({message: "Not authorized"});
        
        res.json({
            email: getUserByEmail.email,
            subscription: getUserByEmail.subscription,
        });
    } catch (err) {
        next({message: err});
    };
};

const uploaderAvatarController = async (req, res, next) => {
    try {
        const file  = req.file;
        const {userId} = req;
        await UserModel.updateUser(userId, {avatar: file.path}, {new: true});
        res.send(`http://localhost:3000/avatars/${file.filename}`);
    } catch (err) {
        next({message: err});
    };
};

module.exports = {
    getCurrentUserController, 
    uploaderAvatarController
};
