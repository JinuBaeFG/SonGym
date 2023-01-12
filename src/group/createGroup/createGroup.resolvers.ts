import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processGroupInfo,
  processGroupTag,
  processFacility,
} from "../group.util";

const createGroupResolvers = async (
  _,
  {
    groupname,
    activeArea,
    areaLatitude,
    areaLongitude,
    sportsEvent,
    photoUrl,
    discription,
    maxMember,
    groupInfo,
    groupTag,
    facilityId,
  },
  { loggedInUser, client }
) => {
  let location;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, groupname, "Group");
  }

  let groupInfoObj = [];
  if (groupInfo !== undefined) {
    groupInfoObj = processGroupInfo(groupInfo);
  }

  let groupTagObj = [];
  if (groupTag !== undefined) {
    groupTagObj = processGroupTag(groupInfo);
  }

  let facilityObj = [];
  if (facilityId !== undefined) {
    facilityObj = processFacility(facilityId);
  }

  const group = await client.group.create({
    data: {
      groupname,
      activeArea,
      areaLatitude,
      areaLongitude,
      sportsEvent,
      photoUrl: location,
      discription,
      maxMember,
      ...(groupInfo !== undefined && {
        groupInfo: {
          connectOrCreate: groupInfoObj,
        },
      }),
      ...(groupTag !== undefined && {
        groupTag: {
          connectOrCreate: groupTagObj,
        },
      }),
      ...(facilityId !== undefined &&
        facilityId.length > 0 && { facility: facilityObj }),
      users: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });

  if (group) {
    await client.groupPresident.create({
      data: {
        user: {
          connect: { id: loggedInUser.id },
        },
        group: {
          connect: {
            id: group.id,
          },
        },
      },
    });
  }

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createGroup: protectedResolver(createGroupResolvers),
  },
};
