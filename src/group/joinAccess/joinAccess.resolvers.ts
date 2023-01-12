import { protectedResolver } from "../../users/users.utils";

const joinAccessResolvers = async (
  _,
  { id, groupId },
  { loggedInUser, client }
) => {
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
    const join = await client.groupJoin.findUnique({
      where: {
        id,
      },
    });
    if (join.id === id && join.groupId === groupId) {
      await client.group.update({
        where: {
          id: groupId,
        },
        data: {
          users: {
            connect: {
              id: join.userId,
            },
          },
        },
      });

      await client.groupJoin.delete({
        where: {
          id,
        },
      });
    }
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "권한이 없습니다.",
    };
  }
};

export default {
  Mutation: {
    joinAccess: protectedResolver(joinAccessResolvers),
  },
};
