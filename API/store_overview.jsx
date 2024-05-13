import { IP_ADDRESS } from "../Constants";
import { objToQueryString } from "./utils";
import { SHOP } from "../App";

const STORE_OVERVIEW_URL = IP_ADDRESS + "/store_overview_data"
async function get_store_overview_data(shop_id) {
  const queryString = objToQueryString({
    "shop_id": shop_id
  })

  const url = STORE_OVERVIEW_URL + `/data?${queryString}`

  return fetch(url)
    .then(data => data.json()).catch((error) => {
      console.log(error)
    })

}

export { get_store_overview_data }
