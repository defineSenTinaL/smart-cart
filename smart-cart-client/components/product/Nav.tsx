import Link from "next/link";
import React from "react";

interface ProductProps {
  product: {
    category: string;
    subCategory: string;
    subSubCategory: string;
  };
}

const Nav: React.FC<ProductProps> = ({ product }) => {
  const category = `/category/${product?.category}`;
  const subCategory = `/category/${product?.subCategory}`;
  const subSubCategory = `/category/${product?.subSubCategory}`;
  return (
    <div className="text-sm font-medium breadcrumbs md:px-10 px-3">
      <ul>
        <li>
          <Link href={category}>{product?.category}</Link>
        </li>
        <li>
          <Link href={subCategory}>
            {product?.subCategory}
            </Link>
        </li>
        <li>
          <Link href={subSubCategory}>{product?.subSubCategory}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
