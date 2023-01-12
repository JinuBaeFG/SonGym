import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacilityEvent,
  processFacilityInfo,
  processFacilityTag,
} from "../facility.util";

const editFacilityResolvers = async (
  _,
  {
    id,
    photoUrl,
    facilityname,
    areaAddress,
    areaLatitude,
    areaLongitude,
    facilityCall,
    facilityInfo,
    facilityTag,
    facilityEvent,
  },
  { loggedInUser, client }
) => {
  const oldFacility = await client.facility.findFirst({
    where: {
      id,
    },
    include: {
      facilityInfo: {
        select: {
          discription: true,
          awardDate: true,
        },
      },
      facilityTag: {
        select: {
          tagname: true,
        },
      },
      facilityEvent: {
        select: {
          sportsevent: true,
        },
      },
    },
  });

  if (!oldFacility) {
    return {
      ok: false,
      error: "시설을 찾을 수 없습니다.",
    };
  }

  let location = null;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, loggedInUser.id, "Facility");
  }

  let facilityInfoObj = [];
  if (facilityInfo !== undefined) {
    facilityInfoObj = processFacilityInfo(facilityInfo);
  }

  let facilityTagObj = [];
  if (facilityTag !== undefined) {
    facilityTagObj = processFacilityTag(facilityTag);
  }

  let facilityEventObj = [];
  if (facilityEvent !== undefined) {
    facilityEventObj = processFacilityEvent(facilityEvent);
  }

  await client.facility.update({
    where: {
      id,
    },
    data: {
      facilityname,
      areaAddress,
      areaLatitude,
      areaLongitude,
      facilityCall,
      ...(photoUrl && {
        photoUrl: location,
      }),
      ...(facilityInfo > 0 && {
        facilityInfo: facilityInfoObj,
      }),
      ...(facilityTag > 0 && {
        facilityTag: facilityTagObj,
      }),
      ...(facilityEvent > 0 && {
        facilityEvent: facilityEventObj,
      }),
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editFacility: protectedResolver(editFacilityResolvers),
  },
};
