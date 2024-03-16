import * as querystring from "query-string";
import queryString from "query-string";
import {IP_ADDRESS} from "../Constants";

const PRODUCT_URL = "http://" + IP_ADDRESS + ":8000/product";

async function get_product_for_shop(store_id) {

  let url = PRODUCT_URL + "/store?" + queryString.stringify({ "store_id" : store_id })
  return fetch(url)

    .then(data => data.json())
}

async function get_general_product_field_for_shop(shop_id, product_field) {


  const params = {
    shop_id: shop_id,
    product_field: product_field,
  };

  // Create a URLSearchParams object and append each parameter
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  // Construct the full URL with the encoded parameters
  const SPECIFIC_PRODUCT_URL = PRODUCT_URL + "/shop_field"
  const fullURL = `${SPECIFIC_PRODUCT_URL}?${searchParams.toString()}`;


  return fetch(fullURL)
    .then(data => data.json())
}

async function get_sorted_products(shop_id) {


  const params = {
    shop_id: shop_id
  };

  // Create a URLSearchParams object and append each parameter
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  // Construct the full URL with the encoded parameters
  const SPECIFIC_PRODUCT_URL = PRODUCT_URL + "/sorted_products"
  const fullURL = `${SPECIFIC_PRODUCT_URL}?${searchParams.toString()}`;


  return fetch(fullURL)
    .then(data => data.json())
}


export { get_product_for_shop, get_general_product_field_for_shop, get_sorted_products }
