import axios from "axios";

const STORE_URL = "http://127.0.0.1:8000/store";
const get_all_stores = () => {
  let url = STORE_URL + "/all"

  axios.get(url)
    .then(response => console.log(response.data))

};

export { get_all_stores };
