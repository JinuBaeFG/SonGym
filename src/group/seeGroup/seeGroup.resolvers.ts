export default {
  Query: {
    seeGroup: async (_, { id }, { client }) => {
      return await client.group.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
