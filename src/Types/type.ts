export type productType = {
  id?: string;
  name?: string;
  category?: string;
  colors?: string[];
  company?: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number|null ;
  featured?: boolean;

  [key: string]: any;
};

export type cartItem = productType & { quantity?: number,cartId?:string,product_id?:string,color?:string};

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
 };
