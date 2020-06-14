import { combineReducers } from "redux";
import { searchReducer } from "../components/flightSearch/reducers";
import { StateInterface } from "./store";
import { loaderReducer } from "../components/app/reducers/loaderReducer";

export default combineReducers<StateInterface>({
    loader: loaderReducer,
    flight: searchReducer,
});
