import { protectedResolver } from "../../users/users.utils";

const joinGroupResolvers = async (_, { id }, { loggedInUser, client }) => {
  const group = await client.group.findUnique({
    where: {
      id,
    },
  });

  if (!group) {
    return {
      ok: false,
      error: "이미 가입하였습니다.",
    };
  }
  const joinWhere = {
    userId_groupId: {
      userId: loggedInUser.id,
      groupId: id,
    },
  };

  const join = await client.groupJoin.findUnique({
    where: joinWhere,
  });

  if (join) {
    await client.groupJoin.delete({
      where: joinWhere,
    });
  } else {
    await client.groupJoin.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        group: {
          connect: {
            id: group.id,
          },
        },
      },
    });
  }
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    joinGroup: protectedResolver(joinGroupResolvers),
  },
};
