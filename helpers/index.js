import clsx from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const generateRequest = (headers) => {
  if (!headers)
    return {
      base_url: process.env.BASE_URL,
    };
};


export const convertBase64ToJS = (base64String) => {
  try {
    return JSON.parse(atob(base64String));
  } catch (error) {
    return null;
  }
};
