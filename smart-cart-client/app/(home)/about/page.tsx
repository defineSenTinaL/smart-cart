import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import logger from "@/libs/logger";

const About = () => {
  const cook = cookies()
  const user = cook.get('userEmail');
  logger.info(`${user?.value} access the About Page`);
  return (
    <>
      <section className="flex items-center bg-base-100 xl:h-screen font-poppins ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap items-center ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="lg:max-w-md">
                <span className="text-xl font-semibold text-primary uppercase">
                  About Us
                </span>
                <h2 className="mt-4 mb-6 text-2xl font-bold">
                  Welcome to Dintly!
                </h2>
                <p className="mb-10 ">
                  At Dintly, we believe in transforming houses into homes and
                  making everyday living more convenient through our curated
                  selection of home improvement, home and kitchen essentials,
                  and cutting-edge electronics. As your go-to online destination
                  for quality products, we strive to enhance your lifestyle with
                  functional and stylish solutions.
                </p>
              </div>
            </div>
            <div className="w-full px-4 mb-10 lg:mb-0">
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-primary text-white">
                <Image src={"/journey.svg"} height={35} width={35} alt={"Image of Our Journey"}  />

                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
                    Our Journey
                  </h2>
                  <p className="text-base leading-loose">
                  Dintly began its journey with a simple vision: to provide
                    customers with a seamless shopping experience for all their
                    home needs. With a commitment to quality, affordability, and
                    customer satisfaction, we have grown from a local store to
                    an online platform serving customers across the nation.
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-primary text-white">
                <Image src={"/product.svg"} height={35} width={35} alt={"Image of Our Product Range"}  />


                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
                    Our Product Range
                  </h2>
                  <p className="text-base leading-loose">
                    Explore our carefully curated collections, featuring
                    everything from innovative home improvement tools to
                    must-have kitchen gadgets and the latest in electronics. We
                    handpick each item to ensure it meets our high standards,
                    delivering both functionality and style to your doorstep.
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-primary text-white">
                <Image src={"/future.svg"} height={35} width={35} alt={"Image of Future Expansion"}  />

                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
                    Future Expansion
                  </h2>
                  <p className="text-base leading-loose">
                    Exciting things are on the horizon! As we continue to
                    evolve, Dintly is set to expand its product range across
                    various categories, offering even more choices to our valued
                    customers. Stay tuned for new arrivals and exclusive deals
                    as we grow to meet your evolving needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100">
        <div className="container grid grid-cols-1 gap-10 px-6 py-12 mx-auto">
          <div>
            <p className="font-medium text-xl text-primary">
              Our locations
            </p>
            <h1 className="mt-2 text-2xl font-semibol md:text-3xl">
              Visit our stores
            </h1>
            <p className="mt-3">
            Can&apos;t wait for shipping? Feel free to visit our physical stores located at
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:col-span-2 sm:grid-cols-2">
            <div>
              <h2 className="font-medium text-primary">
                MR Enterprises
              </h2>
              <p className="mt-2">
              548, Narayanrao pardeshi Bhawan, 49<br /> Raviwar Peth, New Budhwar Peth <br /> Pune Maharashtra 411002
              </p>
            </div>
            <div>
              <h2 className="font-medium text-primary">
                Kumavat Enterprises
              </h2>
              <p className="mt-2">
              Shop No 5, Kalimi Heights <br /> Tilekar Nagar, Kondhwa Budruk <br /> Pune Maharashtra 411048
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-base-100">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight xl:text-3xl">
            Our
            <span className="text-primary"> Commitment</span>
          </h2>
          <p className="max-w-4xl mt-6 text-center">
            At Dintly, customer satisfaction is our top priority. Whether you
            shop online or visit us in person, you can expect exceptional
            service, competitive prices, and a commitment to quality that sets
            us apart. Thank you for choosing Dintly. We look forward to being a
            part of your home improvement journey!
          </p>
          <p className="max-w-4xl mt-6 text-center text-2xl font-medium">
            Thank you for choosing Dintly. We look forward to being a part of
            your journey!
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
