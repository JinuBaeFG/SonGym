import { protectedResolver } from "../../users/users.utils";

const deleteTutorGroupResolvers = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  const tutorGroup = await client.tutorGroup.findUnique({
    where: {
      id,
    },
    select: {
      tutor: {
        tutorId: true,
      },
    },
  });
  if (!tutorGroup) {
    return {
      ok: false,
      error: "해당 그룹을 찾을 수 없습니다.",
    };
  } else if (tutorGroup.tutorId !== loggedInUser.id) {
    return {
      ok: false,
      error: "해당 사용자는 삭제할 수 있는 권한이 없습니다.",
    };
  } else {
    await client.tutorGroup.delete({
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
    deleteTutorGroup: protectedResolver(deleteTutorGroupResolvers),
  },
};
