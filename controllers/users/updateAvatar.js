const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const fs = require('fs/promises');
const { uploadAvatarToCloud } = require('../../helpers');

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload } = req.file;
  const { _id: id } = req.user;

  try {
    const avatarURL = await uploadAvatarToCloud(tempUpload);

    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    throw HttpError(500, 'Write file to server error');
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
