"use client";

import Link from "next/link";
import Image from "next/image";
// Define a type for the document object
interface Document {
  [key: string]: any; // Allow any extra fields
}

interface VerticalCardProps {
  product: Document;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ product }) => {
  // Determine the price to display
  const displayPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].price
      : product?.price;

  const displayMrpPrice =
    product?.variation && product.variation.length > 0
      ? product.variation[0].mrp
      : product?.mrp;

  // Calculate discount percentage
  const discountPercentage = displayMrpPrice
    ? Math.round(((displayMrpPrice - displayPrice) / displayMrpPrice) * 100)
    : 0;

    const imageAlt = `Picture of the product ${product?.title}`;

  return (
    <Link href={`/${product?.slug}?id=${product?._id}&keyword=${product?.keyword.join(',')}`} legacyBehavior>
      <a target="_blank" rel="noopener noreferrer">
      <div className="card card-compact w-full bg-base-100 shadow-xl">
        <figure className="h-[145px] md:h-[200px]">
          <Image
            src={product?.image[0].url}
            width={280}
            height={180}
            alt={imageAlt}
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </figure>
        <div className="card-body">
          <h1 className="block overflow-hidden text-ellipsis whitespace-nowrap text-md md:text-lg">
            {product?.title}
          </h1>
          <div>
            <div className="badge badge-error font-bold badge-md">{discountPercentage}% OFF</div>
            <div className="pt-1 flex items-center">
              <h1 className="text-2xl font-bold">&#8377;{displayPrice}</h1>
              <h1 className="text-md line-through pl-1">
                &#8377;{displayMrpPrice}
              </h1>
            </div>
          </div>
          {/* <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div> */}
        </div>
      </div>
      </a>
    </Link>
  );
};

export default VerticalCard;