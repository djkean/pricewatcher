export const itemTimestampUrl = (itemID, timeStep = "1h") =>
  `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${timeStep}&id=${itemID}`;
export const itemImage = (itemID) =>
  `https://oldschool.runescape.wiki/images/a/a2/${itemID}`;
export const catalogueAPI = "https://prices.runescape.wiki/api/v1/osrs/mapping";
export const itemPriceAPI = "https://prices.runescape.wiki/api/v1/osrs/latest";
