import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacility,
  processTutorInfo,
  processTutorTag,
} from "../tutor.util";

const editTutorResolvers = async (
  _,
  {
    id,
    groupname,
    activeArea,
    areaLatitude,
    areaLongitude,
    sportsEvent,
    photoUrl,
    maxMember,
    tutorInfo,
    tutorTag,
    facility,
  },
  { loggedInUser, client }
) => {
  const oldTutor = await client.tutor.findFirst({
    where: {
      id,
      users: {
        id: loggedInUser.id,
      },
    },
    include: {
      tutorInfo: {
        select: {
          discription: true,
          awardDate: true,
        },
      },
      tutorTag: {
        select: {
          tagname: true,
        },
      },
    },
  });

  if (!oldTutor) {
    return {
      ok: false,
      error: "튜터가 존재하지 않습니다.",
    };
  }

  let location = null;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, loggedInUser.id, "Tutor");
  }

  await client.tutor.update({
    where: {
      id,
    },
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
      groupInfo: {
        disconnect: oldTutor.tutorInfo,
        connectORcreate: processTutorInfo(tutorInfo),
      },
      tutorTag: {
        disconnect: oldTutor.tutorTag,
        connectORcreate: processTutorTag(tutorTag),
      },
      facility: {
        disconnect: oldTutor.facility,
        connectOrcreate: processFacility(facility),
      },
    },
  });
};

export default {
  Mutation: {
    editTutor: protectedResolver(editTutorResolvers),
  },
};
