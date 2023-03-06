const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const path = require('path');
const fs = require('fs/promises');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const extension = originalname.split('.').pop();
  const imageName = `${id}.${extension}`;
  const resultUpload = path.join(avatarDir, imageName);
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw HttpError(500, 'Write file to server error');
  }
};

module.exports = updateAvatar;
