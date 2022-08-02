import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PriceGraph } from "./PriceGraph";
import { VolumeGraph } from "./VolumeGraph";
import { itemImage, itemTimestampUrl } from "../../API/API.js";

export function Product() {
  const routeParams = useParams();
  const productID = routeParams.id;
  const itemData = useLocation();
  const [apiResults, setApiResults] = useState({
    volumeData: null,
    exchangeData: null,
  });

  const fetchExchangeData = () => {
    try {
      fetch(itemTimestampUrl(productID, "5m"))
        .then((response) => response.json())
        .then((itemPriceData) => {
          setApiResults((apiResults) => ({
            ...apiResults,
            volumeData: itemPriceData?.data.filter(
              (dataFilter, index) => index % 5 === 0
            ),
            exchangeData: itemPriceData?.data.filter(
              (priceFilter) =>
                priceFilter.timestamp ===
                Math.max(...itemPriceData.data.map((price) => price.timestamp))
            )[0],
          }));
        });
      console.log(apiResults.volumeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExchangeData();
  }, []);

  console.log(apiResults);
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
          High Price:
          {apiResults?.exchangeData?.avgHighPrice?.toLocaleString() ?? "n/a"}
          High Volume:
          {apiResults?.exchangeData?.highPriceVolume?.toLocaleString()}
        </span>
        <span className="product--stats">
          Low Price:
          {apiResults?.exchangeData?.avgLowPrice?.toLocaleString() ?? "n/a"}
          Low Volume:
          {apiResults?.exchangeData?.lowPriceVolume?.toLocaleString()}
        </span>
        <PriceGraph priceGraphData={apiResults.volumeData} />
        <VolumeGraph volumeGraphData={apiResults.volumeData} />
      </section>
    </article>
  );
}
