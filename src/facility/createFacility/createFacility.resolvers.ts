import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import {
  processFacilityEvent,
  processFacilityInfo,
  processFacilityTag,
} from "../facility.util";

const createFacilityResolvers = async (
  _,
  {
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
  let location = null;
  if (photoUrl) {
    location = await uploadToS3(photoUrl, facilityname, "Facility");
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

  await client.facility.create({
    data: {
      photoUrl: location,
      facilityname,
      areaAddress,
      areaLatitude,
      areaLongitude,
      facilityCall,
      ...(facilityInfo !== undefined && {
        facilityInfo: {
          connectOrCreate: facilityInfoObj,
        },
      }),
      ...(facilityTag !== undefined && {
        facilityTag: {
          connectOrCreate: facilityTagObj,
        },
      }),
      ...(facilityEvent !== undefined && {
        facilityEvent: {
          connectOrCreate: facilityEventObj,
        },
      }),
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createFacility: protectedResolver(createFacilityResolvers),
  },
};
