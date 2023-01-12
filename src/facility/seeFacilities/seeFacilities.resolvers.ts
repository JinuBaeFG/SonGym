import { protectedResolver } from "../../users/users.utils";

const seeFacilitiesResolvers = async (
  _,
  { offset },
  { loggedInUser, client }
) => {
  return await client.facility.findMany({
    take: 3,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeFacilities: seeFacilitiesResolvers,
  },
};
