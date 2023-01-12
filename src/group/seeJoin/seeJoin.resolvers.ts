import { protectedResolver } from "../../users/users.utils";

const seeJoinResolvers = async (_, { groupId }, { loggedInUser, client }) => {
  const checkPresident = await client.groupPresident.findMany({
    where: {
      groupId,
      userId: loggedInUser.id,
    },
    select: {
      id: true,
    },
  });
  if (checkPresident) {
    return await client.groupJoin.findMany({
      where: {
        groupId,
      },
      select: {
        id: true,
        user: true,
        group: true,
      },
    });
  } else {
    return false;
  }
};

export default {
  Query: {
    seeJoin: protectedResolver(seeJoinResolvers),
  },
};
