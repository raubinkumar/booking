import {
    GET_LOCATIONS_PENDING,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAILED,
    GET_FLIGHTS_PENDING,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_FAILED,
} from "../actions/searchAction";
import { Action } from "../../../common/interfaces";

export function searchReducer(state = {}, action: Action): any {
    switch (action.type) {
        case GET_LOCATIONS_PENDING:
            return { ...state, loading: true, error: "" };
        case GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: action.response.data,
                error: "",
            };
        case GET_LOCATIONS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.actionData.errorMessage,
            };
        case GET_FLIGHTS_PENDING:
            return { ...state, loading: true, error: "" };
        case GET_FLIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResults: action.response.data,
                error: "",
            };
        case GET_FLIGHTS_FAILED:
            return {
                ...state,
                loading: false,
                searchResults: [],
                error: action.actionData.errorMessage,
            };
    }

    return state;
}
