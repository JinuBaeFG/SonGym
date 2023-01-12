import { protectedResolver } from "../../users/users.utils";

const deleteGroupResolvers = async (_, { id }, { loggedInUser, client }) => {
  const group = await client.group.findUnique({
    where: {
      id,
    },
    select: {
      groupPresident: {
        userId: true,
      },
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "해당 그룹을 찾을 수 없습니다.",
    };
  } else if (group.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "해당 사용자는 삭제할 수 있는 권한이 없습니다.",
    };
  } else {
    await client.group.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteGroup: protectedResolver(deleteGroupResolvers),
  },
};
