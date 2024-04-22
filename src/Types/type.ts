export type productType = {
  id?: string;
  name?: string;
  category?: string;
  colors?: string[];
  company?: string;
  description?: string;
  image?: string;
  price?: number;
  companies?: {
    id: string | undefined;
    company_name: string | undefined;
  };
  categories?: {
    id: string | undefined;
    name: string | undefined;
  };
  stock?: number | null;
  featured?: boolean;

  [key: string]: any;
};

export type cartItem = productType & {
  quantity?: number;
  cartId?: string;
  product_id?: string;
  color?: string;
};

export type apiResponseType = {
  [id: string]: {
    name: string;
    category: string;
    colors: string[];
    company: string;
    description: string;
    image: string;
    price: number;
    thumbnailImage?: string[];
  };
};
export type OrderDetails = {
  cart_id: string | undefined;
  user_id: string;
  address: string | undefined;
  total_amount: number;
  status: string;
};

export type categories = {
  id: string;
  name: string;
  created_at?: Date;
  category_image_url?: string;
};

export type companies = {
  id: string;
  company_name: string;
  created_at?: Date;
};

export type products = {
  category: string;
  company: string;
};

type Company = {
  id: string | undefined;
  company_name: string | undefined;
};

type Category = {
  id: string | undefined;
  name: string | undefined;
};

export type Product = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number | undefined |null;
  image?: string;
  categories?: Category | null;
  category_id?: string;
  company_id?: string;
  company?: string;
  category?: string;
  colors?: string[];
  companies?: Company | null;
  quantity?: number;
};
