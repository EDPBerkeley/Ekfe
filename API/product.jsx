import * as querystring from "query-string";
import queryString from "query-string";

const PRODUCT_URL = "http://192.168.1.162:8000/product";

async function get_product_for_shop(store_id) {

  let url = PRODUCT_URL + "/store?" + queryString.stringify({ "store_id" : store_id })
  return fetch(url)

    .then(data => data.json())
}


export { get_product_for_shop }
