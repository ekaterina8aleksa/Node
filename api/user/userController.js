// const PORT = process.env.PORT || 3000;
const UserModel = require('./userSchema');
const {createAvatarUrl} = require('../../config')

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
        const UserById = await UserModel.getUserById(userId);
            if(!UserById.token) {
                return res.status(401).json({message: "Not authorized"});
            };
        const avatarURL = createAvatarUrl(file.filename);
        await UserModel.updateUser(userId, {avatarURL: avatarURL}, {new: true});
        res.send({"avatarURL": avatarURL});
    } catch (err) {
        next({message: err});
    };
};


module.exports = {
    getCurrentUserController, 
    uploaderAvatarController
};
