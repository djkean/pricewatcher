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
          setApiResults((apiResults) => ({
            ...apiResults,
            volumeData: itemPriceData?.data.filter(
              (dataFilter, index) =>
                dataFilter.avgLowPrice != null &&
                dataFilter.avgHighPrice != null
            ),
            exchangeData: itemPriceData?.data.filter(
              (priceFilter) =>
                priceFilter.timestamp ===
                Math.max(...itemPriceData.data.map((price) => price.timestamp))
            )[0],
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
          <span>Buy Limit: {itemData.state?.data.limit}</span>
        </section>
        <section className="item--stats">
          <div className="item--flexbox">
            <div className="item--flex--stats">High Price:</div>
            <div className="item--flex--stats" id="high--price--number">
              {apiResults?.exchangeData?.avgHighPrice?.toLocaleString() ??
                "N/A"}
            </div>
            <div className="item--flex--stats">Low Price:</div>
            <div className="item--flex--stats" id="low--price--number">
              {apiResults?.exchangeData?.avgLowPrice?.toLocaleString() ?? "N/A"}
            </div>
            <div className="item--flex--stats">High Volume:</div>
            <div className="item--flex--stats" id="high--vol--number">
              {apiResults?.exchangeData?.highPriceVolume?.toLocaleString()}
            </div>
            <div className="item--flex--stats">Low Volume:</div>
            <div className="item--flex--stats" id="low--vol--number">
              {apiResults?.exchangeData?.lowPriceVolume?.toLocaleString()}
            </div>
          </div>
        </section>
      </div>
      <PriceGraph priceGraphData={apiResults.volumeData} />
      <VolumeGraph volumeGraphData={apiResults.volumeData} />
    </article>
  );
}

/* 
<table>
            <tbody>
              <tr>
                <td>High Price:</td>
                <td className="color--high">
                  {apiResults?.exchangeData?.avgHighPrice?.toLocaleString() ??
                    "N/A"}
                </td>
                <td>Low Price:</td>
                <td className="color--low">
                  {apiResults?.exchangeData?.avgLowPrice?.toLocaleString() ??
                    "N/A"}
                </td>
              </tr>
              <tr>
                <td>High Volume:</td>
                <td className="color--high">
                  {apiResults?.exchangeData?.highPriceVolume?.toLocaleString()}
                </td>
                <td>Low Volume:</td>
                <td className="color--low">
                  {apiResults?.exchangeData?.lowPriceVolume?.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
*/
