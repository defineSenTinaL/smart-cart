import React from "react";

const FeatureSection = () => {
  return (
    <section>
      <div className="w-full mt-10 px-5 md:mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold sm:text-3xl">
            New Collection
          </h2>

          <p className="max-w-md mx-auto mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3 sm:px-4 md:px-8">
          <li>
            <a href="#" className="relative block group">
              <img
                src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">
                  Casual Trainers
                </h3>

                <button className="btn btn-primary btn-xs h-10">Shop Now</button>
              </div>
            </a>
          </li>

          <li>
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Winter Jumpers
                    </h3>

                    <button className="btn btn-primary btn-xs h-10">Shop Now</button>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">Legging</h3>

                    <button className="btn btn-primary btn-xs h-10">Shop Now</button>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">
                      Legging 3
                    </h3>

                    <button className="btn btn-primary btn-xs h-10">Shop Now</button>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="relative block group">
                  <img
                    src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
                  />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-white">Legging</h3>

                    <button className="btn btn-primary btn-xs h-10">Shop Now</button>
                  </div>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#" className="relative block group">
              <img
                src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-md"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">
                  Winter Jumpering
                </h3>

                <button className="btn btn-primary btn-xs h-10">Shop Now</button>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FeatureSection;
