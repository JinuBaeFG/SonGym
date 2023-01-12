import { protectedResolver } from "../../users/users.utils";

const withdrawGroupResolvers = async (_, { id }, { loggedInUser, client }) => {
  await client.group.update({
    where: {
      id,
    },
    data: {
      users: {
        disconnect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    withdrawGroup: protectedResolver(withdrawGroupResolvers),
  },
};
