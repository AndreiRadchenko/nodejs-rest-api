const Jimp = require('jimp');
const fs = require('fs/promises');

const resizeAvatarImg = async (originPath, destPath) => {
  const img = await Jimp.read(originPath);
  img
    // .resize(256, Jimp.AUTO) // resize
    .cover(250, 250) // resize
    .quality(60); // set JPEG quality
  await img.writeAsync(destPath); // save
  await fs.unlink(originPath);
};
module.exports = resizeAvatarImg;
