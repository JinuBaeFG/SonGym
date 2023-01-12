import client from "../client";

export default {
  Tutor: {
    tutorInfo: ({ id }) => {
      return client.tutorInfo.findMany({
        where: {
          tutorId: id,
        },
      });
    },
    tutorTag: ({ id }) => {
      return client.tutorTag.findMany({
        where: {
          tutorId: id,
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
