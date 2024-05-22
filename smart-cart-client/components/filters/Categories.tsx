"use client";

import React from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Document {
  [key: string]: any; // Allow any extra fields
}

interface CategoryProps {
  data: Document;
}

const Categories: React.FC<CategoryProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");

  const handleCategorySelection = (categoryValue: any, fieldName: any) => {
    const existingParams = Object.fromEntries(searchParams);

    // Check if the category is already selected
    let selectedCategories = existingParams[fieldName]
      ? existingParams[fieldName].split(",")
      : [];

    if (!selectedCategories.includes(categoryValue)) {
      // Add the category if not already selected
      selectedCategories.push(categoryValue);
    } else {
      // Remove the category if it's already selected
      selectedCategories = selectedCategories.filter(
        (cat) => cat !== categoryValue
      );
    }

    // Update or delete the parameter based on whether there are any selected categories left
    if (selectedCategories.length > 0) {
      existingParams[fieldName] = selectedCategories.join(",");
    } else {
      delete existingParams[fieldName];
    }

    const newSearch = new URLSearchParams(existingParams).toString();
    router.push(`${pathname}?${newSearch}`, { scroll: false });
  };

  // Flatten the category data into a single array
  const allCategories = data.reduce((acc: any, categoryGroup: any) => {
    // Map each category item to include the field name and the value
    const categoryItems = categoryGroup.counts.map((item: { value: any }) => ({
      fieldName: categoryGroup.field_name, // Add the field name to each item
      value: item.value,
    }));
    return acc.concat(categoryItems);
  }, []);

  return (
    <div className="card card-bordered shadow-md p-4 mb-5 bg-base-100">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="w-16 pb-2 mb-6 border-b border-accent" />
      <ul>
        {allCategories.map((category: any) => {
          // Determine if the current category is selected based on its level
          const isSelected =
            searchParams
              .get(category.fieldName)
              ?.split(",")
              .includes(category.value) ?? false;

          return (
            <li key={category.value} className="mb-4">
              <label htmlFor={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={category.value}
                  className="w-4 h-4 mr-2 checkbox"
                  checked={isSelected}
                  onChange={() =>
                    handleCategorySelection(category.value, category.fieldName)
                  }
                />
                <span className="text-lg dark:text-gray-800">
                  {category.value}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
