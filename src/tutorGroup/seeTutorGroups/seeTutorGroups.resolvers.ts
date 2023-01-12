import { protectedResolver } from "../../users/users.utils";

const seeTutorGroupsResolvers = async (
  _,
  { offset },
  { loggedInUser, client }
) => {
  return await client.tutorGroup.findMany({
    take: 3,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeTutorGroups: protectedResolver(seeTutorGroupsResolvers),
  },
};
