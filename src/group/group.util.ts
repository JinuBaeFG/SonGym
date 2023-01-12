export const processGroupInfo = (datas) => {
  return datas.map((discription) => ({
    where: { discription },
    created: { discription },
  }));
};

export const processGroupTag = (datas) => {
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
