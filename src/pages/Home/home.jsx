import React from "react";

export const HomePage = () => {
  return (
    <div className="page">
      <section id="home--about">
        <p>OSRS PriceWatcher is a tool meant to give accurate, 
        realtime prices for items on the Grand Exchange. 
        It will let you to passively track prices with the 
        option of live updates via email, SMS, or push notifications.</p>
        <p> This project is heavily work-in-progess. Feel free to follow updates{" "}
          <a href="https://github.com/djkean/pricewatcher" className="home--link">
            here</a> {" "}on my github repository.</p>
      </section>
    </div>
  );
};
