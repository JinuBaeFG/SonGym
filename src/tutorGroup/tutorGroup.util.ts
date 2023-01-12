export const processTutorGroupInfo = (datas) => {
  return datas.map((discription) => ({
    where: { discription },
    created: { discription },
  }));
};

export const processTutorGroupTag = (datas) => {
  return datas.map((tagname) => ({
    where: { tagname },
    created: { tagname },
  }));
};

export const processFacility = (datas) => {
  return datas.map((facilityId) => ({
    id: facilityId,
  }));
};
