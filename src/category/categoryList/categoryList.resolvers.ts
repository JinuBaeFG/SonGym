export default {
  Query: {
    categoryList: async (_, { offset }, { client }) => {
      return await client.hashtag.findMany({
        take: 2,
        skip: offset,
      });
    },
  },
};
