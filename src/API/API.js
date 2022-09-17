export const itemDetailUrl = (itemID) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemID}`;
export const itemTimestampUrl = (itemID, timeStep = "1h") =>
  `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${timeStep}&id=${itemID}`;
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

const itemGraphUrl = (itemID) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/graph/${itemID}.json`;

const getItem = async (itemID) => {
  return await fetch(itemDetailUrl(itemID)).then((response) => response.json());
};
