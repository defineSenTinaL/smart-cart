import Banner from "@/components/home/Banner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import logger from "@/libs/logger";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const ServiceSection = dynamic(() => import("@/components/ServiceSection"), {
  ssr: false,
});

export default async function Home() {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Home page`);

  return (
    <>
      <Banner />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-10 mx-10 justify-between pb-10">
        {/* <ProductBox product={cat1}/> */}
        {/* <ProductBox />
      <ProductBox /> */}
      </div>
      <FeaturedProduct />
      {/* <FeatureSection /> */}
      <ServiceSection />
      {/* <MspSection /> */}
      {/* <Newsletter /> */}
    </>
  );
}
