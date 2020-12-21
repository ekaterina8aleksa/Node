const UserModel = require('../user/userSchema');
const bcrypt = require('bcrypt');
const {createVerificationToken} = require('../services/tokenService');
const { sendEmail } = require('../../services/mail.service');

const registrationController = async (req, res, next) => {
    try{
        const {body} = req;
        const {body: { email },} = req;
        await sendEmail(email, token);
        
        const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT));
        await UserModel.createUser({
            ...body,
        verificationToken: token,
        password: hashedPassword,
                });
        const currentUser = await UserDB.findUserById(newUser._id);
        await madeAvatar(newUser._id);
        const currentUserAvatar = await UserDB.updateUser(currentUser._id, {
                avatarURL: createAvatarUrl(newUser._id),
                });
        res.status(201).json({
            user: {
                id: newUser._id,
                email: newUser.email,
                avatarURL: createAvatarUrl(currentUserAvatar.id),
                subscription: newUser.subscription,
            },
        })
    }
    catch (err){
        next(err);
    }
};
    
const loginController = async (req, res, next) => {
    try{
        const {body: {email, password}}= req;
        const user = await UserModel.getUserByEmail({email});
        if(!user) {
            return res.status(404).send({ message:`User with email: ${email} not found`});
        }
        if (!user.verificationToken) {
            return res.status(404).json({ message: `Your account must be verified` });
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if(!isPasswordEqual){
            return res.status(401).send({ message: 'Wrong email or password'});
        }
        const accessToken = await createVerificationToken({id: user._id});
            await UserModel.updateUser(user._id, {token: accessToken}, {new: true});
        
            res.status(201).json({
                token: accessToken,
                user: {
                email: user.email,
                subscription: user.subscription,
                },
            })
    }catch (err){
        res.status(400).json({ message: 'missing required name field' });
        next(err);
    }
};

const logoutController = async (req, res, next) => {
    try {
        const {user: { id },} = req;

        const userById = await UserModel.getUserById({ _id: id });
        if (!userById.token) {
            res.status(401).json({ message: 'No authorization' });
            return;
        }
        await UserModel.updateUser(userById._id, {
            token: '',
        });
        return res.status(204).send('No content');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registrationController,
    loginController,
    logoutController
}
