import axios from "axios";
import { objToQueryString } from "./utils";
import { boundsDicttoArr } from "../Services/Utils";
import {IP_ADDRESS} from "../Constants";

const STORE_URL = "http://" + IP_ADDRESS +":8000/store";
async function get_all_stores() {
  let url = STORE_URL + "/all"

  return fetch(url)
    .then(data => data.json())
}

async function get_stores_in_boundary(bounds_dict)  {

  let bounds_arr = boundsDicttoArr(bounds_dict)

  const queryString = objToQueryString({
    "ne_lon": bounds_arr[1],
    "ne_lat": bounds_arr[0],
    "sw_lon": bounds_arr[3],
    "sw_lat": bounds_arr[2]
  })

  const url = STORE_URL + `/get_stores/boundary?${queryString}`
  // console.log("URL", url)
  return fetch(url)
    .then(data => data.json())
}



export { get_all_stores, get_stores_in_boundary };
