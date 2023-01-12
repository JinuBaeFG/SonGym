import client from "../client";
import { protectedResolver } from "../users/users.utils";

export default {
  Group: {
    users: ({ groupId }) => {
      return client.user.findMany({
        where: {
          group: {
            some: {
              id: groupId,
            },
          },
        },
      });
    },
    userCount: ({ groupId }) => {
      return client.user.count({
        where: {
          group: {
            some: {
              id: groupId,
            },
          },
        },
      });
    },
    groupJoin: ({ id }) => {
      return client.groupJoin.findMany({
        where: {
          groupId: id,
        },
        select: {
          id: true,
          user: true,
          group: true,
        },
      });
    },
    isJoining: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.groupJoin.findUnique({
        where: {
          userId_groupId: {
            userId: loggedInUser.id,
            groupId: id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    }),
    isJoin: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.group.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    }),
    groupPresident: ({ id }) => {
      return client.groupPresident.findMany({
        where: {
          groupId: id,
        },
        select: {
          id: true,
          user: true,
          group: true,
        },
      });
    },
    isPresident: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.groupPresident.findFirst({
        where: {
          groupId: id,
          userId: loggedInUser.id,
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    }),
    groupInfo: ({ id }) => {
      return client.groupInfo.findMany({
        where: {
          groupId: id,
        },
      });
    },
    groupTag: ({ id }) => {
      return client.groupTag.findMany({
        where: {
          groupId: id,
        },
      });
    },
    facility: ({ groupId }) => {
      return client.facility.findMany({
        where: {
          group: {
            some: {
              id: groupId,
            },
          },
        },
      });
    },
  },
};
