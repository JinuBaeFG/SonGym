import client from "../client";

export default {
  Facility: {
    facilityInfo: ({ id }) => {
      return client.facilityInfo.findMany({
        where: {
          facilityId: id,
        },
      });
    },
    facilityEvent: ({ id }) => {
      return client.facilityEvent.findMany({
        where: {
          facilityId: id,
        },
      });
    },
    facilityTag: ({ id }) => {
      return client.facilityTag.findMany({
        where: {
          facilityId: id,
        },
      });
    },
    group: ({ id }) => {
      return client.group.findMany({
        where: {
          facility: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
