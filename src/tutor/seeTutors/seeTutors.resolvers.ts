import { protectedResolver } from "../../users/users.utils";

const seeTutorsResolvers = async (_, { offset }, { loggedInUser, client }) => {
  return await client.group.findMany({
    take: 3,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeTutors: protectedResolver(seeTutorsResolvers),
  },
};
