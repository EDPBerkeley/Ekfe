import axios from "axios";

const STORE_URL = "http://127.0.0.1:8000/store";
async function get_all_stores() {
  let url = STORE_URL + "/all"

  return fetch(url)
    .then(data => data.json())
}



export { get_all_stores };
