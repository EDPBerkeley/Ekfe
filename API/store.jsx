import axios from "axios";
import { objToQueryString } from "./utils";

const STORE_URL = "http://127.0.0.1:8000/store";
async function get_all_stores() {
  let url = STORE_URL + "/all"

  return fetch(url)
    .then(data => data.json())
}

async function get_stores_in_boundary(ne_lat, ne_lon, sw_lat, sw_lon)  {
  const queryString = objToQueryString({
    "ne_lon": ne_lon,
    "ne_lat": ne_lat,
    "sw_lon": sw_lon,
    "sw_lat": sw_lat
  })
  const url = STORE_URL + `/get_stores/boundary?${queryString}`
  // console.log("URL", url)
  return fetch(url)
    .then(data => data.json())
}



export { get_all_stores, get_stores_in_boundary };
