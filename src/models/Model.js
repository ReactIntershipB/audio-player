import { observable, action } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable data = [];

    @observable loading = false;

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    getData = (term, filterName) => {
        this.toggleLoading();
        return axios.get(`${this.getAPIBaseURL}${filterName}:"${term}"`)
            .then(res => {
                this.data = res.data.data;
                this.toggleLoading();
            })
            .catch(err => console.log(err));
    }

    setData = data => {
        this.data = data;
    }

    @action
    toggleLoading = () => {
        this.loading = !this.loading;
    }
}
