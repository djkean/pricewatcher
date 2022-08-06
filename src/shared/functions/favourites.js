export const addFavourite = (item) => {
  if (localStorage.getItem("favourites") === null) {
    localStorage.setItem("favourites", JSON.stringify([item]));
  } else {
    const favouriteItems = JSON.parse(localStorage.getItem("favourites"));
    const dupeCheck = favouriteItems.filter(
      (favItem) => favItem.id === item.id
    ).length;
    if (dupeCheck === 0) {
      favouriteItems.push(item);
      localStorage.setItem("favourites", JSON.stringify(favouriteItems));
    }
  }
  return JSON.parse(localStorage.getItem("favourites"));
};

export const removeFavourite = (id) => {
  const favList = JSON.parse(localStorage.getItem("favourites"));
  if (favList === null) return;
  const dupes = favList.filter((checkID) => checkID.id !== id);
  localStorage.setItem("favourites", JSON.stringify(dupes));
  return JSON.parse(localStorage.getItem("favourites"));
};

export const loadFavourites = () => {
  return JSON.parse(localStorage.getItem("favourites"));
};
