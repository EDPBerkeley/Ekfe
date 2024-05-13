import axios from "axios";
import { objToQueryString } from "./utils";
import { boundsDicttoArr } from "../Services/Utils";
import {IP_ADDRESS} from "../Constants";

const SHOP_URL = IP_ADDRESS + "/store";
async function get_all_stores() {
  let url = SHOP_URL + "/all"

  return fetch(url)
    .then(data => data.json()).catch((error) => {
      console.log(error)
    })
}

async function get_stores_in_boundary(bounds_dict)  {

  let bounds_arr = boundsDicttoArr(bounds_dict)

  const queryString = objToQueryString({
    "ne_lon": bounds_arr[1],
    "ne_lat": bounds_arr[0],
    "sw_lon": bounds_arr[3],
    "sw_lat": bounds_arr[2]
  })

  const url = SHOP_URL + `/get_stores/boundary?${queryString}`
  console.log("KDSJKJKF" + url)
  // console.log("URL", url)
  return fetch(url)
    .then(data => data.json()).catch((error) => {
      console.log(error)
    })
}

async function get_random_shop(){
  const url = SHOP_URL + "/random_shop"
  return fetch(url)
      .then(data => data.json()).catch((error) => {
      console.log(error)
    })
}

async function get_shop_given_id(id, resolve_images) {
  const params = {
    shop_id: id,
    resolve_images: resolve_images ? 1 : 0
  };

  // Create a URLSearchParams object and append each parameter
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  // Construct the full URL with the encoded parameters
  const SPECIFIC_SHOP_URL = SHOP_URL + "/get_shop/shop_id"
  const fullURL = `${SPECIFIC_SHOP_URL}?${searchParams.toString()}`;

  console.log("THIS IS URL", fullURL)
  return fetch(fullURL)
    .then(data => data.json()).catch((error) => {
      console.log(error)
    })
}

async function get_shop_from_text_search(query){
  const params = {
    text_input: query
  };

  // Create a URLSearchParams object and append each parameter
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }

  // Construct the full URL with the encoded parameters
  const SPECIFIC_SHOP_URL = SHOP_URL + "/get_shop/text_search"
  const fullURL = `${SPECIFIC_SHOP_URL}?${searchParams.toString()}`;
  return fetch(fullURL)
    .then(data => data.json()).catch((error) => {
      console.log(error)
    })
}



export { get_all_stores, get_stores_in_boundary, get_random_shop, get_shop_given_id, get_shop_from_text_search };
