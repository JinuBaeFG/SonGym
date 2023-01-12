const seeTagResolvers = async (_, { offset }, { client }) => {
  return await client.tag.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export default {
  Query: {
    seeTag: seeTagResolvers,
  },
};
