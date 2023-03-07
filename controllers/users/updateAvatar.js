const { User } = require('../../models/user');
const { HttpError, resizeAndMoveAvatar } = require('../../helpers');
const path = require('path');
const fs = require('fs/promises');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload } = req.file;
  const { _id: id } = req.user;

  const imageName = `${id}.jpg`;
  const resultUpload = path.join(avatarDir, imageName);
  try {
    await resizeAndMoveAvatar(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw HttpError(500, 'Write file to server error');
  }
};

module.exports = updateAvatar;
