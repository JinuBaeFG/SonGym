import client from "../client";

export default {
  TutorGroup: {
    tutorGroupInfo: ({ id }) => {
      return client.tutorGroupInfo.findMany({
        where: {
          tutorGroupId: id,
        },
      });
    },
    tutorGroupTag: ({ id }) => {
      return client.tutorGroupTag.findMany({
        where: {
          tutorGroupId: id,
        },
      });
    },
    facility: ({ tutorGroupId }) => {
      return client.facility.findMany({
        where: {
          group: {
            some: {
              id: tutorGroupId,
            },
          },
        },
      });
    },
  },
};
