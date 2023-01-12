export default {
  Query: {
    seeGroupInfo: async (_, { id }, { client }) => {
      return await client.groupInfo.findMany({
        where: {
          group: {
            id,
          },
        },
        orderBy: {
          awardDate: "asc",
        },
      });
    },
  },
};
