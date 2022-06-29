const itemDetailUrl = (itemId) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemId}`;
const itemGraphUrl = (itemId) =>
  `http://services.runescape.com/m=itemdb_oldschool/api/graph/${itemId}.json`;

const getItem = async (itemId) => {
  return await fetch(itemDetailUrl(itemId))
    .then((response) => response.json())
    .then((data) => console.log(data));
};

getItem(50);
