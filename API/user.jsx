import {IP_ADDRESS} from "../Constants";

const USER_URL = "http://" + IP_ADDRESS + ":8000/user"
async function get_random_user() {
    const url = USER_URL + "/random_user"
    return fetch(url)
        .then(data => data.json())
}

export { get_random_user }