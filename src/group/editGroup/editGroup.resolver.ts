import { processGroup, uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";

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
    groupInfo,
    groupTag,
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
      groupInfo: {
        select: {
          discription: true,
          awardDate: true,
        },
      },
      groupTag: {
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
        connectORcreate: processGroup(groupInfo),
      },
      groupTag: {
        disconnect: oldGroup.groupTag,
        connectORcreate: processGroup(groupTag),
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
