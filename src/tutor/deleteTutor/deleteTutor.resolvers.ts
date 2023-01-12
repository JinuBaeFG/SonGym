import { protectedResolver } from "../../users/users.utils";

const deleteTutorResolvers = async (_, { id }, { loggedInUser, client }) => {
  const tutor = await client.tutor.findUnique({
    where: {
      id,
    },
    select: {
      id,
    },
  });
  if (!tutor) {
    return {
      ok: false,
      error: "해당 튜터를 찾을 수 없습니다.",
    };
  } else if (tutor.id !== loggedInUser.id) {
    return {
      ok: false,
      error: "해당 사용자는 삭제할 수 있는 권한이 없습니다.",
    };
  } else {
    await client.tutor.delete({
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
    deleteTutor: protectedResolver(deleteTutorResolvers),
  },
};
