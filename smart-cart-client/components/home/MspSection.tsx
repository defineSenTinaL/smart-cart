// Most Selling Product

import React from "react";
import VerticalCard from "../VerticalCard";

const MspSection = () => {
  return (
    <section className="bg-base-100 py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Best Selling Product
          </h2>
          <p className="mt-4 text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            faucibus massa dignissim tempus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3 sm:px-4 md:px-8">
        {/* <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
        <VerticalCard /> */}
        </div>
      </div>
    </section>
  );
};

export default MspSection;
