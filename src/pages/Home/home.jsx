import React from "react";

export const HomePage = () => {
  return (
    <div className="page">
      <section id="home--about">
        <p>Pricewatcher is a tool meant to give accurate, 
        realtime prices for items on Oldschool Runescape's Grand Exchange. 
        You can passively track prices for specific items with the 
         Favourites tab. In the future you can opt-in to live updates via email, SMS, or push notifications.</p>
        <p> This project is work-in-progess. Feel free to follow updates{" "}
          <a href="https://github.com/djkean/pricewatcher" className="home--link">
            here</a> {" "}on github.</p>
      </section>
    </div>
  );
};
