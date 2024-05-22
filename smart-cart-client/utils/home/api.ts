import { API } from "../urls";

export const fetchAllProducts = async () => {
    const url = `${API}/product/newly-added-products`;
    try {
        const res = await fetch(url);
        return res.json();
    } catch (error) {
        //throw new Error("An error occurred while fetching the Product.");
    }
}

export const fetchCategoryProducts = async (params: { category?: string; subCategory?: string; subSubCategory?: string }) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API}/product/by-category?${queryParams}`;

    try {
        const res = await fetch(url);
        return res.json();
    } catch (error) {
        console.error(`Error fetching category products: ${error}`);
        return [];
    }
}