import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { FlightMainModel } from "../components/flightSearch/models";
import api from "../middlewares/api";
import { enableBatching } from "redux-batched-actions";

export interface StateInterface {
    loader: any;
    flight: FlightMainModel;
}

export default function configureStore(initialState = {}) {
    return applyMiddleware(thunk, api)(createStore)(
        enableBatching(rootReducer),
        initialState
    );
}
