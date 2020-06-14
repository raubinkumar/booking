import { SearchResultModel } from "./searchResultModel";

export class FlightMainModel {
    locations: [];
    searchResults: SearchResultModel[];
    error: string;
    loading: boolean;
}
