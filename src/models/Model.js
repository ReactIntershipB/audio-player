import { observable } from 'mobx';

import { CORS_ALLOW_URL, BASE_URL } from "../config/api_config";

export class Model {
    @observable isInitialized = false;

    @action
    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    @action
    getSongsFromAPI = (getAPIBaseURL, term) => {
        return axios.get(`${getAPIBaseURL}${term}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

}
