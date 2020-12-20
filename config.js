require('dotenv').config();
const PORT = process.env.PORT || 3000;
const defaultAvatar = () => './public/images/default-avatar.png';
const createUserAvatarInFolder = (userId) => `./tmp/${userId}.png`;
const publicImagesPath = () => './public/images';
const createAvatarUrl = (filename) => `localhost:${PORT}/images/${filename}`;

module.exports = {
    createUserAvatarInFolder,
    createAvatarUrl, 
    defaultAvatar,
    publicImagesPath,
    }







