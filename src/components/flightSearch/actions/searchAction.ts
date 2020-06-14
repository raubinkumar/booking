import { Action } from "../../../common/interfaces";
import { SearchInputModel } from "../models/searchInputModel";
import { CALL_API } from "../../../middlewares/api";
import * as api from "../../../../src/services/api";
import { ErrorMessage } from "../../common/constants/errorMessage";

export const GET_LOCATIONS_PENDING = "GET_LOCATIONS_PENDING";
export const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
export const GET_LOCATIONS_FAILED = "GET_LOCATIONS_FAILED";

export const GET_FLIGHTS_PENDING = "GET_FLIGHTS_PENDING";
export const GET_FLIGHTS_SUCCESS = "GET_FLIGHTS_SUCCESS";
export const GET_FLIGHTS_FAILED = "GET_FLIGHTS_FAILED";

export function fetchLocation(): Function {
    return function (dispatch: any, getState: Function) {
        const url = api.getDataApiBaseUrl() + "/locations";
        return dispatch({
            [CALL_API]: {
                types: [
                    GET_LOCATIONS_PENDING,
                    GET_LOCATIONS_SUCCESS,
                    GET_LOCATIONS_FAILED,
                ],
                url: url,
                method: "GET",
            },
            actionData: {
                errorMessage: ErrorMessage.FAILED_TO_FETCH_FLIGHTS,
            },
        });
    };
}

export function searchFlight(query: SearchInputModel): Function {
    return function (dispatch: any, getState: Function) {
        const url = `${api.getDataApiBaseUrl()}/flights?from=${
            query.source
        }&to=${query.destination}`;
        return dispatch({
            [CALL_API]: {
                types: [
                    GET_FLIGHTS_PENDING,
                    GET_FLIGHTS_SUCCESS,
                    GET_FLIGHTS_FAILED,
                ],
                url: url,
                method: "GET",
            },
            actionData: {
                errorMessage: ErrorMessage.FAILED_TO_FETCH_FLIGHTS,
            },
        });
    };
}
