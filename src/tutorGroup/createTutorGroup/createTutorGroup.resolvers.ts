import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacility,
  processTutorGroupInfo,
  processTutorGroupTag,
} from "../tutorGroup.util";

const createTutorGroupResolvers = async (
  _,
  {
    groupname,
    activeArea,
    areaLatitude,
    areaLongitude,
    sportsEvent,
    photoUrl,
    maxMember,
    facility,
    tutorGroupInfo,
    tutorGroupTag,
  },
  { loggedInUser, client }
) => {
  let location;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, groupname, "Group");
  }

  let tutorGroupInfoObj = [];
  if (tutorGroupInfo.length > 0) {
    tutorGroupInfoObj = processTutorGroupInfo(tutorGroupInfo);
  }

  let tutorGroupTagObj = [];
  if (tutorGroupTag.length > 0) {
    tutorGroupTagObj = processTutorGroupTag(tutorGroupTag);
  }

  let facilityObj = [];
  if (facility.length > 0) {
    facilityObj = processFacility(facility);
  }

  return client.group.create({
    data: {
      groupname,
      activeArea,
      areaLatitude,
      areaLongitude,
      sportsEvent,
      ...(photoUrl && {
        photoUrl: location,
      }),
      maxMember,
      ...(tutorGroupInfo.length > 0 && {
        tutorGroupInfo: {
          connectOrCreate: tutorGroupInfoObj,
        },
      }),
      ...(tutorGroupTag.length > 0 && {
        tutorGroupTag: {
          connectOrCreate: tutorGroupTagObj,
        },
      }),
      ...(facility.length > 0 && {
        facility: facilityObj,
      }),
      users: loggedInUser,
    },
  });
};

export default {
  Mutation: {
    createTutorGroup: protectedResolver(createTutorGroupResolvers),
  },
};
