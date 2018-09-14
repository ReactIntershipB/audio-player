import { observable, action } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable data = [];

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    getData = (term, filterName) => {
      return axios.get(`${this.getAPIBaseURL}${filterName}:"${term}"`)
        .then(res => this.setData(res.data.data))
        .catch(err => console.log(err));
    }

    @action
    setData = (data) => {
        console.log(data);
        this.data = data;
    }
}
