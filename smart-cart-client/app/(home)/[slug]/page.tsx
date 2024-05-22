import ProductCarousel from "@/components/ProductCarousel";
import Description from "@/components/product/Description";
import Feature from "@/components/product/Feature";
import Gallery from "@/components/product/Gallery";
import Info from "@/components/product/Info";
import Nav from "@/components/product/Nav";
import Review from "@/components/product/Review";
import logger from "@/libs/logger";
import { fetchProductById, getRelatedProducts } from "@/utils/product/api";
import { API } from "@/utils/urls";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: { id: string };
// }): Promise<Metadata> {
//   const id = searchParams?.id;
//   const product = await fetchProductById(id);

//   if (!product) return notFound();

//   // Default to the first image if variations are present, or the primary product image
//   // You might not have width and height in your data, so consider a default or omit these
//   const defaultWidth = 1200; // Example default width
//   const defaultHeight = 630; // Example default height

//   const indexable = !product.tag?.includes("nextjs-frontend-hidden"); // Assuming 'HIDDEN_PRODUCT_TAG' is a constant or variable holding the tag used for non-indexable products

//   // Mapping over the product images to create an array of Open Graph images
//   const openGraphImages = product.image.map((img: any) => ({
//     url: img.url,
//     width: defaultWidth, // Optional: Use actual dimensions if available
//     height: defaultHeight, // Optional: Use actual dimensions if available
//     alt: product.title, // Using the product title as alt text for each image
//   }));

//   return {
//     title: product.title,
//     description: product.description,
//     keywords: [product?.keyword.join(",")],
//     alternates: {
//       canonical: `/${product?.slug}?id=${
//         product?._id
//       }&keyword=${product?.keyword.join(",")}`,
//     },
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable,
//       },
//     },
//     openGraph: {
//       title: product.title, // Explicitly set og:title
//       description: product.description, // Explicitly set og:description
//       url: `https://www.dintly.in/${product?.slug}?id=${
//         product?._id
//       }&keyword=${product?.keyword.join(",")}`,
//       images: openGraphImages, // Including the array of images in the Open Graph metadata
//       countryName: "India",
//     },
//   };
// }

export default async function ProductDetail({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams?.id;
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Product Details Page`);
  const product = await fetchProductById(id);

  console.log(product);

  //const relatedProduct: any = await getRelatedProducts(product?.tag);

  return (
    <>
      <div className="w-full bg-base-100">
        <div className="pt-6">
          <Nav product={product} />
          {/* <!-- Image gallery --> */}
          <Gallery image={product?.image} />
          {/* <!-- Product info --> */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-10 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            {/* <!-- Options/Info --> */}
            <Info product={product} />

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* <!-- Description and details --> */}
              <Description product={product} />
            </div>
          </div>
        </div>
        <Feature product={product} />
        <Review product={product} />
        {/* <Suspense
          fallback={<span className="loading loading-dots loading-md"></span>}
        >
          <ProductCarousel product={relatedProduct} />
        </Suspense> */}
      </div>
    </>
  );
}
