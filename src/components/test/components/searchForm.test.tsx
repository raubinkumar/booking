import * as React from "react";
import SearchPanel from "../../flightSearch/components/searchPanel";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

test("Checks whether state query is passed correctly to handler or not.", () => {
    const locations = ["Loc1", "Loc2"];
    const today = new Date();
    const stateObj = {
        from: "Loc1",
        to: "Loc2",
        departDate: today,
        returnDate: today,
        trip: 0,
    };
    const expected = {
        departureDate: today,
        destination: "Loc2",
        source: "Loc1",
        trip: 0,
        returnDate: today,
    };
    const dummySearchFunction = (query: any) => {
        expect(query).toStrictEqual(expected);
    };
    const component = shallow(
        <SearchPanel locations={locations} onSearch={dummySearchFunction} />
    );
    component.setState(stateObj);
    const instance = component.instance();
    instance.onSearch();
});
