import { observable, action } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable isInitialized = false;

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    @action
    getSongsFromAPI = (term, filterName) => {
        return axios.get(`${this.getAPIBaseURL}${filterName}:"${term}"`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
}
