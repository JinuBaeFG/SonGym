import client from "../../client";
import { multipartUploadToS3, uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photo.utils";

const uploadPhotoResolvers = async (
  _,
  { files, caption, sortation },
  { loggedInUser }
) => {
  let hashtagObjs = [];
  if (caption) {
    hashtagObjs = processHashtag(caption);
  }

  let uploadFileObjs;

  if (files !== undefined) {
    if (files.length > 1) {
      uploadFileObjs = await multipartUploadToS3(
        files,
        loggedInUser.id,
        sortation
      );
    } else if (files.length === 1) {
      let fileUrl = await uploadToS3(files[0], loggedInUser.id, sortation);
      await uploadFileObjs.push({ where: { fileUrl }, create: { fileUrl } });
    }
  }

  return client.photo.create({
    data: {
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObjs.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
      }),
      ...(uploadFileObjs !== undefined && {
        files: {
          connectOrCreate: uploadFileObjs,
        },
      }),
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(uploadPhotoResolvers),
  },
};
