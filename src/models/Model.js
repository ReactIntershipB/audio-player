import { observable, action } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable data = [];

    @observable loading = false;

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    getData = (apiQuery) => {
      this.toggleLoading();
      return axios.get(`${this.getAPIBaseURL}${apiQuery}`)
        .then(res => {
            this.data = res.data;
            this.toggleLoading();
        })
        .catch(err => {
            console.log(err);
            this.toggleLoading();
        });
    }

    setData = data => {
        this.data = data;
    }

    @action
    toggleLoading = () => {
        this.loading = !this.loading;
    }
}
