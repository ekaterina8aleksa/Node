const multer = require('multer');
const { publicImagesPath} = require('../../config');

const avatarUploader = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cd) {
            cd(null, publicImagesPath)},
        filename: function (req, file, cd) {
            const fileType = file.mimetype.split('/')[1];
            if(fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
                return cd(new Error('Need a picture'));
            }
            cd(null, `${req.userId}.${fileType}`);
        }
    })
    return multer ({storage}).single('avatar')
}

module.exports = {
    avatarUploaderMiddleware: avatarUploader(),
}
