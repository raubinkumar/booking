export class SearchInputModel {
    source: string;
    destination: string;
    departureDate: any;
    returnDate?: any;
    trip: Trip;
}

enum Trip {
    Oneway,
    RoundTrip,
}
