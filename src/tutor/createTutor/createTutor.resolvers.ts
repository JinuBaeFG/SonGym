import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacility,
  processTutorInfo,
  processTutorTag,
} from "../tutor.util";

const createTutorResolvers = async (
  _,
  {
    groupname,
    activeArea,
    areaLatitude,
    areaLongitude,
    sportsEvent,
    photoUrl,
    tutorInfo,
    tutorTag,
    facility,
  },
  { loggedInUser, client }
) => {
  let location = null;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, groupname, "Tutor");
  }

  let tutorInfoObj = [];
  if (tutorInfo.length > 0) {
    tutorInfoObj = processTutorInfo(tutorInfo);
  }

  let tutorTagObj = [];
  if (tutorTag.length > 0) {
    tutorTagObj = processTutorTag(tutorTag);
  }

  let facilityObj = [];
  if (facility.length > 0) {
    facilityObj = processFacility(facility);
  }
  return client.tutor.create({
    data: {
      groupname,
      activeArea,
      areaLatitude,
      areaLongitude,
      sportsEvent,
      photoUrl: location,
      ...(tutorInfo.length > 0 && {
        tutorInfo: {
          connectOrCreate: tutorInfoObj,
        },
      }),
      ...(tutorTag.length > 0 && {
        tutorTag: {
          connectOrCreate: tutorTagObj,
        },
      }),
      ...(facility.length > 0 && {
        facility: facilityObj,
      }),
      user: loggedInUser,
    },
  });
};

export default {
  Mutation: {
    createTutor: protectedResolver(createTutorResolvers),
  },
};
