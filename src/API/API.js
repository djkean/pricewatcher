export const itemDetailUrl = (itemId) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemId}`;
const itemGraphUrl = (itemId) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/graph/${itemId}.json`;
export const itemVolumeUrl = (itemId, timeStep = "1h") =>
  `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${timeStep}&id=${itemId}`;
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;

const getItem = async (itemId) => {
  return await fetch(itemDetailUrl(itemId))
    .then((response) => response.json())
    .then((data) => console.log(data));
};
