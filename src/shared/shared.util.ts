import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

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
    return Location;
  } catch (e) {
    console.log(e);
  }
};
