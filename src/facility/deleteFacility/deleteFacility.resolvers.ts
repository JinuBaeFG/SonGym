import { protectedResolver } from "../../users/users.utils";

const deleteFacilityResolvers = async (_, { id }, { loggedInUser, client }) => {
  const facility = await client.facility.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!facility) {
    return {
      ok: false,
      error: "해당 시설을 찾을 수 없습니다.",
    };
  } else {
    await client.facility.delete({
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
    deleteFacility: protectedResolver(deleteFacilityResolvers),
  },
};
