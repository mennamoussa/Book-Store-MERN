const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');

const cloudinaryConfig = cloudinary.v2.config({
  cloud_name: "dxsevlivo",
  api_key: "549941841397368",
  api_secret: "EEEzJXRFb4jh0iiMhYqmQ-go4JU",
});

cloudinaryConfig;

const uploadFile = async (file, folder) => {
  fs.writeFileSync(path.join(__dirname, `../tempFiles/${file.name}`), file.data);

  const tempFilePath = path.join(__dirname, `../tempFiles/${file.name}`);
  const fileUrl = `https://res.cloudinary.com/dxsevlivo/raw/upload/${folder}/${file.name}`;

  // const fileExists = await fetch(fileUrl);
  // if (fileExists.status === 200) {
  //   await cloudinary.v2.uploader.destroy(file.name);
  // }

  const res = await cloudinary.v2.uploader.upload(tempFilePath, {
    folder,
    resource_type: 'auto',
    public_id: file.name,
  });

  fs.unlinkSync(tempFilePath);

  return {
    Location: res.secure_url,
    Key: res.public_id,
  };
};

const deleteFile = async (key) => {
  await cloudinary.v2.uploader.destroy(key);
};

const getFile = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status} - ${response.statusText}`);
  }

  const fileBuffer = await response.buffer();

  return { Body: fileBuffer };
};

const deleteFolder = async (dir) => {
  const res = await cloudinary.v2.api.delete_resources_by_prefix(dir);

  return res;
};

module.exports = { uploadFile, deleteFile, getFile, deleteFolder };