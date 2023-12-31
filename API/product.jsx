import * as querystring from "query-string";
import queryString from "query-string";
import {IP_ADDRESS} from "../Constants";

const PRODUCT_URL = "http://" + IP_ADDRESS + ":8000/product";

async function get_product_for_shop(store_id) {

  let url = PRODUCT_URL + "/store?" + queryString.stringify({ "store_id" : store_id })
  return fetch(url)

    .then(data => data.json())
}


export { get_product_for_shop }
