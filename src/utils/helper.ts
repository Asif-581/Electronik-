

import { apiResponseType } from "../Types/type";
import { productType } from "../Types/type";
export const formatPrice = (number:number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

export const formatObjResposeToArray = (obj: apiResponseType) => {
  const result = [];
  for (const key in obj) {
    result.push({ id: key, ...obj[key] });
  }
  return result;
};

export const getUniqueValues = (data:productType[] , type:string) => {
  let unique : string[] = data.map((item) => item[type]);
 
  if (type === "colors") {
    unique = unique.flat();
  }

  return ["All", ...new Set(unique)];
};

