import { action, observable } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable data = [];
    @observable isError = false;
    @observable loading = false;

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    @action
    getData = (apiQuery) => {
        this.toggleLoading();
        return axios.get(`${this.getAPIBaseURL}${apiQuery}`)
            .then(res => {
                console.log(res.data);
                this.data = res.data;
                this.toggleLoading();
            })
            .catch(() => {
                this.isError = true;
                this.toggleLoading();
            });
    }

    @action
    toggleLoading = () => {
        this.loading = !this.loading;
    }
}
