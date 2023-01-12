export default {
  Query: {
    seePhotoComments: async (_, { id }, { client }) => {
      return await client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },
};
