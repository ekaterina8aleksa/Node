const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscription: {
        type: String,
        enum: ['free', 'pro', 'premium'],
        default: 'free',
    },
    token: {
        type: String,
    },
    avatarURL: {
        type: String,
        required: true,
        default: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
    },
    verificationToken: {
        type: String,
        required: true,
        default: true,
    },
});

class UserModel {
    constructor() {
    this.db = mongoose.model('Users', userSchema);
    }

    createUser = async userData => {
    return await this.db.create(userData);
    };

    getUserByEmail = async query => {
    return await this.db.findOne(query);
    };
    
    getUserByToken = async token => {
        return await this.db.findOne(token);
    };
    updateUser = async (userId, userNewData) => {
    return await this.db.findByIdAndUpdate(userId, userNewData, {new: true});
    };

    getUserById = async userId => {
    return await this.db.findById(userId);
    };
}

module.exports = new UserModel;