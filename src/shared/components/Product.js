import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { itemPriceAPI } from "./ProductList";
import { RenderChart } from "./PriceGraph";
import { VolumeGraph } from "./VolumeGraph";
import { itemImage, itemVolumeUrl } from "../../API/API.js";

export function Product() {
  const routeParams = useParams();
  const productID = routeParams.id;
  const itemData = useLocation();
  const [apiResults, setApiResults] = useState({
    priceData: null,
    volumeData: null,
    itemVolume: null,
  });

  const fetchItemVolume = () => {
    try {
      fetch(itemVolumeUrl(productID, "5m"))
        .then((response) => response.json())
        .then((itemVolumeData) => {
          setApiResults((apiResults) => ({
            ...apiResults,
            volumeData: itemVolumeData?.data,
            itemVolume: itemVolumeData?.data.filter(
              (volumeFilter) =>
                volumeFilter.timestamp ==
                Math.max(
                  ...itemVolumeData.data.map((volume) => volume.timestamp)
                )
            )[0],
          }));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemPrice = () => {
    try {
      fetch(`${itemPriceAPI}?id=${itemData.state?.data.id}`)
        .then((response) => response.json())
        .then((itemApiData) => {
          setApiResults((apiResults) => ({
            ...apiResults,
            priceData: itemApiData?.data[itemData?.state?.data?.id],
          }));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemPrice();
    fetchItemVolume();
  }, []);

  console.log(itemData);
  console.log(apiResults);
  console.log(itemImage(itemData.state.data.icon.replace(/ /g, "_")));
  return (
    <article className="product">
      <section className="product--details">
        <div className="product--head">
          <img
            src={itemImage(itemData.state.data.icon.replace(/ /g, "_"))}
            className="product--image"
            alt=" "
          />
          <div>
            <h2 className="product--name">{itemData.state?.data.name}</h2>
            <span className="product--id"> - {productID}</span>
          </div>
        </div>
        <span className="product--buylimit">
          Buy Limit: {itemData.state?.data.limit}
        </span>
        <span className="product--examine">
          Examine Text:
          <p className="product--examine--text">
            {itemData.state?.data.examine}
          </p>
        </span>
      </section>
      <section className="product--stats">
        <span className="product--stats">
          High Price: {apiResults?.priceData?.high.toLocaleString()}
          High Volume:
          {apiResults?.itemVolume?.highPriceVolume}
        </span>
        <span className="product--stats">
          Low Price: {apiResults?.priceData?.low.toLocaleString()}
          Low Volume:
          {apiResults?.itemVolume?.lowPriceVolume}
        </span>
        <RenderChart />
        <VolumeGraph />
      </section>
    </article>
  );
}
