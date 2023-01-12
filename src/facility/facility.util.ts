export const processFacilityInfo = (datas) => {
  return datas.map((discription) => ({
    where: { discription },
    created: { discription },
  }));
};

export const processFacilityTag = (datas) => {
  return datas.map((tagname) => ({
    where: { tagname },
    created: { tagname },
  }));
};

export const processFacilityEvent = (datas) => {
  return datas.map((sportsEvent) => ({
    where: { sportsEvent },
    created: { sportsEvent },
  }));
};
