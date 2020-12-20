const {createUserAvatarInFolder} = require('../config');
const path = require('path');
const AvatarGenerator = require('avatar-generator');
const sprites = '../../node_modules/avatar-generator/img'

async function generateAvatar(userId) {
  const avatar = new AvatarGenerator({
    parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
    partsLocation: path.join(__dirname,  sprites),
    imageExtension: '.png',
  });
  const variant = 'female';
  const image = await avatar.generate(userId, variant);
  image.png().toFile(createUserAvatarInFolder(userId));
}
module.exports = { generateAvatar };

