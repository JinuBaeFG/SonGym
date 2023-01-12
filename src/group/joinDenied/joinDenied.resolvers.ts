import { group } from "console";
import { protectedResolver } from "../../users/users.utils";

const joinDeniedResolvers = async (
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
    await client.groupJoin.delete({
      where: {
        id,
      },
    });
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
    joinDenied: protectedResolver(joinDeniedResolvers),
  },
};
