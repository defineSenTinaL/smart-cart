// types.ts
export interface Image {
  url?: string;
  fileId?: string;
}

export interface ProductDimension {
  length?: number;
  breadth?: number;
  height?: number;
}

export interface Variance {
  price?: number;
  color?: string;
  quantity?: number;
  size?: string;
  style?: string;
  material?: string;
  _id?: string;
}

export interface UserCart {
  _id?: string;
  title?: string;
  image?: Image[];
  brand?: string;
  price: number;
  quantity: number; // This represents the quantity in the cart
  color?: string;
  size?: string;
}

export interface CartItem {
  _id?: string;
  title?: string;
  slug?: string;
  image?: Image[];
  productId?: UserCart[];
  categoryId?: string;
  subCategoryId?: string;
  subSubCategoryId?: string;
  category?: string;
  subCategory?: string;
  subSubCategory?: string;
  productDimension?: ProductDimension;
  count?: number;
  component?: string[];
  fragile?: string;
  packageWeight?: number;
  brand?: string;
  manufacturer?: string;
  review?: number;
  manufacturerDetail?: string;
  manufacturerPartNumber?: string;
  warranty?: string;
  mrp?: number;
  price: number;
  description?: string;
  bullet?: string[];
  tag?: string[];
  color?: string;
  material?: string;
  quantity: number; // This represents the quantity in the cart
  sold?: number;
  kharidi?: number;
  dpin?: string;
  sku?: string;
  gst?: number;
  state?: string;
  gift?: string;
  origin?: string;
  hsn?: number;
  keyword?: string[];
  weight?: number;
  shape?: string;
  model?: string;
  style?: string;
  size?: string;
  delivery?: string;
  return?: string;
  variationId?: string;
  variation?: Variance[]; // Assuming variation IDs are stored as strings
}

// Define the state and actions for the cart slice
export interface CartSlice {
  cartItems: CartItem[];
  buyNowItem: any,
  addToCart: (item: CartItem) => void;
  updateCart: (id: string, quantity: number) => void; // Simplified for example
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setBuyNowItem: (item: any) => void;
  clearBuyNowItem: () => void;
}
