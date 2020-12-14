const UserModel = require('../user/userSchema');
const bcrypt = require('bcrypt');
const {createVerificationToken} = require('../services/tokenService');

const registrationController = async (req, res, next) => {
    try{
        const {body} = req;
        
        const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT));
        await UserModel.createUser({
            ...body,
        password: hashedPassword,
            });
        res.status(201).send('Created');
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
            return res.status(404).send(`User with email: ${email} not found`);
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if(!isPasswordEqual){
            return res.status(401).send('Wrong email or password');
        }
        const access_token = await createVerificationToken({id: user._id});
        res.json({
            access_token,
        });
    }catch (err){
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
