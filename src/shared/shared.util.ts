import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const delay = () => {
  const randomDelay = Math.floor(Math.random() * 4) * 100;
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
};

export const multipartUploadToS3 = async (files, userId, folderName) => {
  let uploadFileObjs = [];

  const promises = files.map(async (file) => {
    let fileUrl = await uploadToS3(file, userId, folderName);
    return await delay().then(() => fileUrl);
  });

  const results = await Promise.all(promises);

  results.forEach((fileUrl) => {
    uploadFileObjs.push({ where: { fileUrl }, create: { fileUrl } });
  });

  return uploadFileObjs;
};

export const uploadToS3 = async (file, userId, folderName) => {
  try {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "songym-uploads",
        Key: objectName,
        ACL: "public-read-write",
        Body: readStream,
      })
      .promise();
    console.log(Location);
    return Location;
  } catch (e) {
    console.log(e);
  }
};
