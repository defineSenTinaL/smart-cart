import { API } from "../urls";

interface QueryParams {
  q: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  subSubCategory?: string;
  size?: string;
  color?: string;
  price?: string;
  offset?: number;
  sort?: string;
}

export async function category(category: string, query: QueryParams) {
  //console.log(query);
  // Create a base search object with the text query
  const searchParameters: any = {
    q: category,
    query_by: "category, subCategory, subSubCategory", // Customize your search fields
  };

  // Create an object to store filter parameters dynamically
  const filters: string[] = [];

  // Decode and filter for categories
  if (query.category) {
    const categories = decodeURIComponent(query.category).split(",");
    filters.push(`category: [${categories.map(cat => `"${cat.trim()}"`).join(", ")}]`);
  }

  // Decode and filter for subCategories
  if (query.subCategory) {
    const subCategories = decodeURIComponent(query.subCategory).split(",");
    filters.push(`subCategory: [${subCategories.map(subCat => `"${subCat.trim()}"`).join(", ")}]`);
  }

  // Decode and filter for subSubCategories
  if (query.subSubCategory) {
    const subSubCategories = decodeURIComponent(query.subSubCategory).split(",");
    filters.push(`subSubCategory: [${subSubCategories.map(subSubCat => `"${subSubCat.trim()}"`).join(", ")}]`);
  }

  // Add filters for each field if they are present in the query
  if (query.brand) {
    const brands = query.brand.split(",");
    filters.push(`brand: [${brands.map((brand) => brand.trim()).join(", ")}]`);
    // Enclose the brands in square brackets as an array without quotes
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split(":");
    filters.push(`price:[${minPrice}..${maxPrice}]`);
    // Enclose the price range in square brackets
  }

  if (query.size) {
    const sizes = query.size.split(",");
    filters.push(`size: [${sizes.map((size) => size.trim()).join(", ")}]`);
  }

  if (query.color) {
    const colors = query.color.split(",");
    filters.push(`color: [${colors.map((color) => color.trim()).join(", ")}]`);
  }

  // You can add more filters in a similar way for other parameters

  // Combine all filters into a single filter_by parameter
  if (filters.length > 0) {
    searchParameters.filter_by = filters.join(" && ");
  }

  // Add sorting if needed
  if (query.sort) {
    searchParameters.sort_by = query.sort; // Assuming sortBy is something like 'price:desc'
  }

  if (query.offset) {
    searchParameters.offset = query.offset;
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split(":");
    filters.push(`price:[${minPrice}..${maxPrice}]`);
    // Enclose the price range in square brackets
  }

  try {
    const Results = {}
    //console.log(searchResults)
    //const result = JSON.stringify(searchResults);
    return Results;
  } catch (error: any) {
    console.error(`Error fetching category data: ${error.message}`);
    return [];
  }
}

export async function fetchCategoryFilters(query: string) {

  const searchParameters: any = {
    searches: [
      {
        collection: "products",
        q: query,
        query_by: "brand, category, subCategory, subSubCategory", // Customize your search fields
        facet_by: "brand",
      },
      {
        collection: "products",
        q: query,
        query_by: "category, subCategory, subSubCategory", // Customize your search fields
        facet_by: "category, subCategory, subSubCategory",
      },
      {
        collection: "products",
        q: query,
        query_by: "color, category, subCategory, subSubCategory", // Adjust fields according to your data
        facet_by: "color", // Faceting by color
      },
      {
        collection: "products",
        q: query,
        query_by: "size, category, subCategory, subSubCategory", // Adjust fields according to your data
        facet_by: "size", // Faceting by color
      },
    ],
  };
  try {
    const response = {}

    return response;
  } catch (error: any) {
    console.error(`Error fetching category filters: ${error.message}`);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API}/category`);
    return res.json();
  } catch (error: any) {
    console.error(`Error fetching categories: ${error.message}`);
    return [];
  }
}
