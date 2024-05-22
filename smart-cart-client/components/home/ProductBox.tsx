import Link from "next/link";
import React from "react";
import Image from "next/image";

interface ProductProps {
  product: {
    _id: string;
    slug: string;
    image: {
      url: string;
      fileId: string;
      _id: string;
    }[];
    category?: string;
    subCategory?: string;
    subSubCategory?: string;
    description: string;
    keyword: string[];
  }[];
}

const ProductBox: React.FC<ProductProps> = ({ product }) => {
  // Function to determine the link path
  const getLinkPath = (productItem: ProductProps['product'][number]) => {
    if (productItem.category) {
      return `/category/${productItem.category}`;
    } else if (productItem.subCategory) {
      return `/subcategory/${productItem.subCategory}`;
    } else if (productItem.subSubCategory) {
      return `/subsubcategory/${productItem.subSubCategory}`;
    } else {
      return "/";
    }
  };
  return (
    <div className="max-w-md p-4 bg-base-100 card card-bordered shadow-lg rounded-box -hidden lg:flex xl:flex flex-col">
      <div className="h-0 prose">
        <h2>Category</h2>
      </div>
      <div className="carousel carousel-center max-w-md mt-10 space-x-4 bg-base-200 rounded-box -hidden lg:flex xl:flex">
      {product?.map((productItem, index) => (
          productItem.image && productItem.image[0] && (
            <div className="carousel-item" key={productItem.image[0]._id}>
              <Link href={getLinkPath(productItem)}>
                <Image
                  src={productItem.image[0].url}
                  width={300}
                  height={400}
                  alt={`Image ${index + 1}`}
                  className="rounded-box"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </Link>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ProductBox;
