import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PriceGraph } from "../PriceGraph";
import { VolumeGraph } from "../VolumeGraph";
import { itemImage, itemTimestampUrl } from "../../../API/API.js";

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
        <span className="product--examine">
          <p className="product--examine--text">
            {itemData.state?.data.examine}
          </p>
        </span>
        <span className="product--buylimit">
          Buy Limit: {itemData.state?.data.limit}
        </span>
      </section>
      <section className="product--stats">
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
      </section>
      <PriceGraph priceGraphData={apiResults.volumeData} />
      <VolumeGraph volumeGraphData={apiResults.volumeData} />
    </article>
  );
}

/*           <div>
            High Price:
            {apiResults?.exchangeData?.avgHighPrice?.toLocaleString() ?? "N/A"}
          </div>
          <div className="stats--break"> | </div>
          <div>
            Low Price:
            {apiResults?.exchangeData?.avgLowPrice?.toLocaleString() ?? "N/A"}
          </div>
        </div>
        <div>
          High Volume:
          {apiResults?.exchangeData?.highPriceVolume?.toLocaleString()}
          Low Volume:
          {apiResults?.exchangeData?.lowPriceVolume?.toLocaleString()}
        </div> */
