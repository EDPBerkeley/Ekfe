import {IP_ADDRESS} from "../Constants";

const USER_URL = IP_ADDRESS + "/user"
async function get_random_user() {
    const url = USER_URL + "/random_user"
    return fetch(url)
        .then(data => data.json()).catch((error) => {
          console.log(error)
      })
}

export { get_random_user }
