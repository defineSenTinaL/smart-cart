export interface Image {
    url: string;
    fileId: string;
  }
  
  export interface ProductDimension {
    length: number;
    breadth: number;
    height: number;
  }

  export interface Variance {
    price: number;
    mrp: number;
    color: string;
    quantity: number;
    size: string;
    style: string;
    material: string;
    _id: string;
  }
  
  export interface ProductProps {
    product: {
      _id: string;
      title: string;
      slug: string;
      image: Image[];
      categoryId: string;
      subCategoryId: string;
      subSubCategoryId: string;
      category: string;
      subCategory: string;
      subSubCategory: string;
      product_dimension: ProductDimension;
      count: number;
      component: string[];
      fragile: string;
      packageWeight: number;
      brand: string;
      manufacturer: string;
      review: number;
      totalRatingsCount: number;
      totalRatingSum: number;
      manufacturerDetail: string;
      manufacturerPartNumber: string;
      warranty: string;
      mrp: number;
      price: number;
      description: string;
      bullet: string[];
      tag: string[];
      color: string;
      material: string;
      quantity: number; // This represents the quantity in the cart
      sold: number;
      kharidi: number;
      dpin: string;
      sku: string;
      gst: number;
      state: string;
      gift: string;
      origin: string;
      hsn: number;
      keyword: string[];
      weight: number;
      shape: string;
      model: string;
      style: string;
      size: string;
      delivery: string;
      return: string;
      variation: Variance[]; // Assuming variation IDs are stored as strings
    };
  }