import { protectedResolver } from "../../users/users.utils";

const deletePhotoResolvers = async (_, { id }, { loggedInUser, client }) => {
  const photo = await client.photo.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  if (!photo) {
    return {
      ok: false,
      error: "사진이 존재하지 않습니다.",
    };
  } else if (photo.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "권한이 없습니다.",
    };
  } else {
    await client.photo.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deletePhoto: protectedResolver(deletePhotoResolvers),
  },
};
