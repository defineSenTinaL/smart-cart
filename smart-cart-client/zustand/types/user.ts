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
  
  export interface CartProduct {
    productId?: string; // Assuming ObjectId is represented as a string in the frontend
    variationId?: string; // Assuming ObjectId is represented as a string in the frontend
    _id?: string;
    title?: string;
    slug?: string;
    image?: Image[];
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
    variation?: Variance[]; // Assuming variation IDs are stored as strings
  }

  export interface Address {
    _id?: string;
    name: string;
    mobile: string;
    addressLine: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    addressType?: string;
  }
  
  export interface WishlistProduct {
    productId: string; // Assuming ObjectId is represented as a string in the frontend
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    mobile?: number | null;
    address: Address[];
    cart: CartProduct[];
    wishlist: WishlistProduct[];
  }
  
  // Define the state shape and action types for the user slice
  export interface UserSlice {
    user: User;
    setUser: (user: User) => void;
    updateUser: (updatedFields: Partial<User>) => void;
    addAddress: (address: Address) => void;
    updateAddress: (addressId: string, updatedAddress: Partial<Address>) => void;
    // Add similar types for cart and wishlist methods if needed
  }
  