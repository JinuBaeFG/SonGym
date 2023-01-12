export const processTutorInfo = (datas) => {
  return datas.map((discription) => ({
    where: { discription },
    created: { discription },
  }));
};

export const processTutorTag = (datas) => {
  return datas.map((tagname) => ({
    where: { tagname },
    created: { tagname },
  }));
};

export const processFacility = (datas) => {
  return datas.map((facilityId) => ({
    connect: {
      id: facilityId,
    },
  }));
};
