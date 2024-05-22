import React from "react";
import { ProductProps } from "./types";

const Description: React.FC<ProductProps> = ({ product }) => {
  return (
    <>
      <div>
        <span className="sr-only">Description</span>

        <div className="space-y-6">
          <p className="text-base">
            {product?.description}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <span className="text-sm font-medium">Highlights</span>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {product?.bullet.map((bulletPoint, index) => (
              <li key={index} className="">
                <span className="">{bulletPoint}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Description;
