import React from "react";
import { Navbar } from "./shared/components/Navbar";
import { PriceGraph } from "./shared/components/PriceGraph";
import { VolumeGraph } from "./shared/components/VolumeGraph";
import { Footer } from "./shared/components/Footer";

export function App() {
  return (
    <>
      <Navbar />
      <PriceGraph />
      <VolumeGraph />
      <Footer />
    </>
  );
}
