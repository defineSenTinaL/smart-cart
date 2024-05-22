
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

export default async function search(query: QueryParams) {
  // Basic cleaning of the query to remove known price indicators
  let cleanedQuery = query.q.replace(/rs/gi, '').trim();

  // Initialize search parameters
  const searchParameters: any = {
    query_by: "description, brand",
  };

  // Create an object to store filter parameters dynamically
  const filters: string[] = [];


  // Decode and filter for categories
  if (query.category) {
    const categories = decodeURIComponent(query.category).split(",");
    filters.push(
      `category: [${categories.map((cat) => `"${cat.trim()}"`).join(", ")}]`
    );
  }

  // Decode and filter for subCategories
  if (query.subCategory) {
    const subCategories = decodeURIComponent(query.subCategory).split(",");
    filters.push(
      `subCategory: [${subCategories
        .map((subCat) => `"${subCat.trim()}"`)
        .join(", ")}]`
    );
  }

  // Decode and filter for subSubCategories
  if (query.subSubCategory) {
    const subSubCategories = decodeURIComponent(query.subSubCategory).split(
      ","
    );
    filters.push(
      `subSubCategory: [${subSubCategories
        .map((subSubCat) => `"${subSubCat.trim()}"`)
        .join(", ")}]`
    );
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

  // Regex to find "below" or "above" price conditions
  const priceConditionRegex = /(above|below) (\d+)/;
  const priceMatch = cleanedQuery.match(priceConditionRegex);

  if (priceMatch) {
    const [_, condition, price] = priceMatch;
    if (condition.toLowerCase() === 'below') {
      filters.push(`price:<${price}`);
    } else if (condition.toLowerCase() === 'above') {
      filters.push(`price:>${price}`);
    }

    // Remove the price condition from the search query
    cleanedQuery = cleanedQuery.replace(priceConditionRegex, '').trim();
  }

  // Set the cleaned query without price condition
  searchParameters.q = cleanedQuery;

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

  console.log(searchParameters);

  try {
    const Results = {}
    return Results;
  } catch (error: any) {
    console.error(`Error fetching search results: ${error}`);
    return [];
  }
}

export async function fetchFilters(query: QueryParams) {
  const searchParameters: any = {
    searches: [
      {
        collection: "products",
        q: query,
        query_by: "title, brand", // Customize your search fields
        facet_by: "brand",
      },
      {
        collection: "products",
        q: query,
        query_by: "title, category, subCategory, subSubCategory", // Customize your search fields
        facet_by: "category, subCategory, subSubCategory",
      },
      {
        collection: "products",
        q: query,
        query_by: "title, color", // Adjust fields according to your data
        facet_by: "color", // Faceting by color
      },
      {
        collection: "products",
        q: query,
        query_by: "title, size", // Adjust fields according to your data
        facet_by: "size", // Faceting by color
      },
    ],
  };
  try {
    const response = {}

    return response;
  } catch (error: any) {
    console.error(`Error fetching search filters: ${error.message}`);
    return [];
  }
}

// export async function fetchBrands(query: QueryParams) {
//   //console.log(query);

//   const searchParameters: any = {
//     q: query,
//     query_by: "title, brand", // Customize your search fields
//     facet_by: "brand",
//   };
//   try {
//     const response = await client
//       .collections("products")
//       .documents()
//       .search(searchParameters);

//     // Extract the list of brands from the response and return it
//     //console.log(response);

//     return response;
//   } catch (error: any) {
//     console.error(`Error fetching brands: ${error.message}`);
//     return [];
//   }
// }

// export async function fetchCategory(query: QueryParams) {
//   //console.log(query);

//   const searchParameters: any = {
//     q: query,
//     query_by: "title, category, subCategory, subSubCategory", // Customize your search fields
//     facet_by: "category, subCategory, subSubCategory",
//   };
//   try {
//     const response = await client
//       .collections("products")
//       .documents()
//       .search(searchParameters);

//     // Extract the list of brands from the response and return it
//     //console.log(response);

//     return response;
//   } catch (error: any) {
//     console.error(`Error fetching brands: ${error.message}`);
//     return [];
//   }
// }

// export async function fetchColors(query: QueryParams) {
//   const searchParameters: any = {
//     q: query,
//     query_by: "title, color", // Adjust fields according to your data
//     facet_by: "color", // Faceting by color
//   };

//   try {
//     const response = await client
//       .collections("products")
//       .documents()
//       .search(searchParameters);

//     // Extract the list of colors from the response and return it
//     return response;
//   } catch (error: any) {
//     console.error(`Error fetching colors: ${error.message}`);
//     return [];
//   }
// }

// export async function fetchSize(query: QueryParams) {
//   const searchParameters: any = {
//     q: query,
//     query_by: "title, size", // Adjust fields according to your data
//     facet_by: "size", // Faceting by color
//   };

//   try {
//     const response = await client
//       .collections("products")
//       .documents()
//       .search(searchParameters);

//     // Extract the list of colors from the response and return it
//     return response;
//   } catch (error: any) {
//     console.error(`Error fetching colors: ${error.message}`);
//     return [];
//   }
// }
