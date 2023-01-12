const seeSportsEventResolvers = async (_, { offset }, { client }) => {
  return client.sportsEvent.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export default {
  Query: {
    seeSportsEvent: seeSportsEventResolvers,
  },
};
