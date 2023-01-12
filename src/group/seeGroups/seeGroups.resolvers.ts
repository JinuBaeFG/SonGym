import { protectedResolver } from "../../users/users.utils";

const seeGroupsResolvers = async (_, { offset }, { loggedInUser, client }) => {
  return await client.group.findMany({
    take: 3,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeGroups: protectedResolver(seeGroupsResolvers),
  },
};
