"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Brand from "./Brand";
import Categories from "./Categories";
import Size from "./Size";
import Color from "./Color";
import Price from "./Price";

interface Document {
  [key: string]: any; // Allow any extra fields
}

interface FilterButtonProps {
  filterData: Document;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterData }) => {


  const brand_data: any = filterData?.results[0];
  const category_data: any = filterData?.results[1];
  const color_data: any = filterData?.results[2];
  const size_data: any = filterData?.results[3];
  // Create a ref for the modal
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Function to open the modal
  const openModal = () => {
    modalRef.current?.showModal();
  };

  // Function to close the modal
  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div>
      {/* Image wrapped in a button */}
      <div className="flex justify-center items-center w-10 h-11">
        <Image
          src="/filter1.svg"
          width={40}
          height={44}
          alt="SVG of the filter"
          onClick={openModal}
        />
      </div>

      {/* Modal code */}
      <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
        <div className="modal-box h-96">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle glass fixed top-2 right-2 z-50">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">Filters</h3>
          {/* Categories section */}
          {category_data?.facet_counts?.[0]?.counts &&
          category_data.facet_counts[0].counts.length > 0 ? (
            <Categories data={category_data.facet_counts} />
          ) : (
            <></>
          )}

          {/* Size section */}
          {size_data?.facet_counts?.[0]?.counts &&
          size_data.facet_counts[0].counts.length > 0 ? (
            <Size data={size_data.facet_counts[0].counts} />
          ) : (
            <></>
          )}

          {/* Color section */}
          {color_data?.facet_counts?.[0]?.counts &&
          color_data.facet_counts[0].counts.length > 0 ? (
            <Color data={color_data.facet_counts[0].counts} />
          ) : (
            <></>
          )}

          {/* Brand section */}
          {brand_data?.facet_counts?.[0]?.counts &&
          brand_data.facet_counts[0].counts.length > 0 ? (
            <Brand data={brand_data.facet_counts[0].counts} />
          ) : (
            <></>
          )}
          <Price />
        </div>
      </dialog>
    </div>
  );
};

export default FilterButton;
