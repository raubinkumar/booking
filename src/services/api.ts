import { AxiosRequestConfig } from "axios";
import axios from "axios";

import { ApiConfigInterface, apiConfig } from "../config/apiConfig";

export function getBase(config: ApiConfigInterface = apiConfig) {
    return `${config.protocol}://${config.host}`;
}

export function getDataApiBaseUrl(config: ApiConfigInterface = apiConfig) {
    return `${getBase(config)}/${config.dataApiUrl}`;
}

export interface ApiInterface {
    getDataApiBaseUrl(apiConfig: ApiConfigInterface): string;
    getApplicationApiBaseUrl(apiConfig: ApiConfigInterface): string;
    callAPI(requestConfig: Record<string, any>): Promise<any>;
}

export function getRequestInstance() {
    const requestInstance: AxiosRequestConfig = {};
    requestInstance.baseURL = getDataApiBaseUrl();
    requestInstance.headers = {
        authorization: `Token ${localStorage.getItem("usertoken")}`
    };
    return requestInstance;
}

export function callAPI(requestConfig: AxiosRequestConfig) {
    return axios(requestConfig);
}

export function setHeaders(requestConfig: AxiosRequestConfig) {
    requestConfig.headers = Object.assign(
        {},
        {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: localStorage.getItem("usertoken")
                ? `Token ${localStorage.getItem("usertoken")}`
                : ""
        },
        requestConfig.headers
    );
    return requestConfig;
}
