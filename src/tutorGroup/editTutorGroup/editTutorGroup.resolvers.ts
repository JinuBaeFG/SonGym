import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacility,
  processTutorGroupInfo,
  processTutorGroupTag,
} from "../tutorGroup.util";

const editGroupResolvers = async (
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
    facility,
    tutorGroupInfo,
    tutorGroupTag,
  },
  { loggedInUser, client }
) => {
  const oldGroup = await client.group.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
    include: {
      tutorGroupInfo: {
        select: {
          discription: true,
          awardDate: true,
        },
      },
      tutorGroupTag: {
        select: {
          tagname: true,
        },
      },
      facility: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!oldGroup) {
    return {
      ok: false,
      error: "그룹이 찾을 수 없습니다.",
    };
  }

  let location = null;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, loggedInUser.id, "Group");
  }

  await client.photo.update({
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
        disconnect: oldGroup.groupInfo,
        connectORcreate: processTutorGroupInfo(tutorGroupInfo),
      },
      groupTag: {
        disconnect: oldGroup.groupTag,
        connectORcreate: processTutorGroupTag(tutorGroupTag),
      },
      facility: {
        disconnect: oldGroup.facility,
        connect: processFacility(facility),
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editGroup: protectedResolver(editGroupResolvers),
  },
};
