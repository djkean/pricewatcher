import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PriceGraph } from "../PriceGraph";
import { VolumeGraph } from "../VolumeGraph";
import { itemImage, itemTimestampUrl } from "../../../API/API.js";

export function ItemDetails() {
  const routeParams = useParams();
  const itemsID = routeParams.id;
  const itemData = useLocation();
  const [apiResults, setApiResults] = useState({
    volumeData: null,
    exchangeData: null,
  });

  const fetchExchangeData = () => {
    try {
      fetch(itemTimestampUrl(itemsID, "5m"))
        .then((response) => response.json())
        .then((itemPriceData) => {
          const latestLowPrice = itemPriceData?.data.filter(
            (priceFilter) =>
              priceFilter.timestamp ===
              Math.max(
                ...itemPriceData.data.map(
                  (price) => price.avgLowPrice && price.timestamp
                )
              )
          )[0];

          const latestHighPrice = itemPriceData?.data.filter(
            (priceFilter) =>
              priceFilter.timestamp ===
              Math.max(
                ...itemPriceData.data.map(
                  (price) => price.avgHighPrice && price.timestamp
                )
              )
          )[0];

          const oldestLowPrice = itemPriceData?.data.filter(
            (price) => price.avgLowPrice
          )[0];

          const oldestHighPrice = itemPriceData?.data
            .filter((priceFilter) => priceFilter.avgHighPrice)
            .sort((a, b) => a.timestamp < b.timestamp)[0];

          setApiResults((apiResults) => ({
            ...apiResults,
            volumeData: itemPriceData?.data.filter(
              (dataFilter, index) =>
                dataFilter.avgLowPrice != null &&
                dataFilter.avgHighPrice != null
            ),
            exchangeData: {
              lowPrice: latestLowPrice,
              highPrice: latestHighPrice,
              oldestLowPrice: oldestLowPrice,
              oldestHighPrice: oldestHighPrice,
            },
          }));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExchangeData();
  }, []);
  return (
    <article className="item">
      <div className="item--card">
        <section className="item--details">
          <div className="item--head">
            <img
              src={itemImage(itemData.state.data.icon.replace(/ /g, "_"))}
              className="item--image"
              alt=" "
            />
            <div>
              <h2 className="item--name">{itemData.state?.data.name}</h2>
              <span className="item--id"> - {itemsID}</span>
            </div>
          </div>
          <span>
            <p>{itemData.state?.data.examine}</p>
          </span>
          <span>Buy Limit: {itemData.state?.data.limit?.toLocaleString()}</span>
        </section>
        <section className="item--stats">
          <div className="item--flexbox">
            <div className="flex--stats">High Price:</div>
            <div className="flex--stats" id="high--price--number">
              {apiResults?.exchangeData?.highPrice?.avgHighPrice?.toLocaleString() ??
                "..."}
            </div>
            <div className="flex--stats">Low Price:</div>
            <div className="flex--stats" id="low--price--number">
              {apiResults?.exchangeData?.lowPrice?.avgLowPrice?.toLocaleString() ??
                "..."}
            </div>
            <div className="flex--stats">High Volume:</div>
            <div className="flex--stats" id="high--vol--number">
              {apiResults?.exchangeData?.highPrice?.highPriceVolume?.toLocaleString() ??
                "..."}
            </div>
            <div className="flex--stats">Low Volume:</div>
            <div className="flex--stats" id="low--vol--number">
              {apiResults?.exchangeData?.lowPrice?.lowPriceVolume?.toLocaleString() ??
                "..."}
            </div>
          </div>
        </section>
      </div>
      <PriceGraph
        priceGraphData={apiResults?.volumeData}
        priceRange={apiResults?.exchangeData}
      />
      <VolumeGraph volumeGraphData={apiResults?.volumeData} />
    </article>
  );
}
