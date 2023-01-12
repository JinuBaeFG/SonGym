import { protectedResolver } from "../../users/users.utils";

const seeMyGroupResolvers = async (_, { offset }, { loggedInUser, client }) => {
  return await client.group.findMany({
    take: 3,
    skip: offset,
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeMyGroup: protectedResolver(seeMyGroupResolvers),
  },
};
