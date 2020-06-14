import * as React from "react";
import { SearchInputModel } from "../models/searchInputModel";
import moment from "moment";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../common/constants/errorMessage";
import {
    TextField,
    Container,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Radio,
    FormControlLabel,
} from "@material-ui/core";

export interface SearchProps {
    onSearch?: (search: SearchInputModel) => void;
    locations?: string[];
}

interface State {
    from?: string;
    to?: string;
    departDate?: any;
    returnDate?: any;
    trip: number;
}

class SearchPanel extends React.Component<SearchProps, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            from: "",
            to: "",
            departDate: new Date(),
            returnDate: new Date(),
            trip: 0,
        };
    }

    handleTripChange = (evt: any) => {
        this.setState({ trip: Number(evt.target.value) });
    };

    onSearch = () => {
        const { from, to, departDate, returnDate, trip } = this.state;
        if (!from || !to) {
            toast.error(ErrorMessage.SELECT_SOURCE_AND_DESTINATION);
            return;
        }
        this.props.onSearch({
            departureDate: departDate,
            destination: to,
            source: from,
            trip: trip,
            returnDate: returnDate,
        });
    };

    handleSearchFromChange = (evt: any) => {
        this.setState({ from: evt.target.value });
    };

    handleSearchToChange = (evt: any) => {
        this.setState({ to: evt.target.value });
    };

    render() {
        const places = this.props.locations || [];
        return (
            <Container className="search-bar-container">
                <div style={{ color: "red" }}>
                    Note: Return journey search is not implemented
                </div>
                <Container>
                    <FormControlLabel
                        value="one-way"
                        control={
                            <Radio
                                id="one-way"
                                checked={this.state.trip === 0}
                                onChange={this.handleTripChange}
                                value={0}
                                name="radio-button-one-way"
                                inputProps={{ "aria-label": "0" }}
                            />
                        }
                        label="One Way"
                    />
                    <FormControlLabel
                        value="return"
                        control={
                            <Radio
                                id="return"
                                checked={this.state.trip === 1}
                                onChange={this.handleTripChange}
                                value={1}
                                name="radio-button-return"
                                inputProps={{ "aria-label": "1" }}
                                disabled
                            />
                        }
                        label="Return"
                    />
                </Container>
                <Container>
                    <FormControl className="search-form-control">
                        <InputLabel id="search-depart-from-label">
                            From
                        </InputLabel>
                        <Select
                            labelId="search-depart-from-label"
                            id="search-depart-from"
                            value={this.state.from || ""}
                            onChange={this.handleSearchFromChange}
                            style={{ textAlign: "left" }}
                        >
                            {places.map((place) => {
                                return (
                                    <MenuItem key={place} value={place}>
                                        {place}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="search-form-control">
                        <InputLabel id="search-depart-to-label">To</InputLabel>
                        <Select
                            labelId="search-depart-to-label"
                            id="search-depart-to"
                            value={this.state.to || ""}
                            onChange={this.handleSearchToChange}
                            style={{ textAlign: "left" }}
                        >
                            {places.map((place) => {
                                return (
                                    <MenuItem key={place} value={place}>
                                        {place}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="search-form-control">
                        <TextField
                            id="depart-date"
                            label="Departure Date"
                            type="date"
                            defaultValue={moment(this.state.departDate).format(
                                "YYYY-MM-DD"
                            )}
                            className="form-datepicker"
                        />
                    </FormControl>
                    <FormControl className="search-form-control">
                        <TextField
                            id="return-date"
                            label="Return Date"
                            type="date"
                            defaultValue={moment(this.state.returnDate).format(
                                "YYYY-MM-DD"
                            )}
                            className="form-datepicker"
                            disabled={this.state.trip === 0}
                        />
                    </FormControl>
                    <FormControl className="search-form-control">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onSearch}
                        >
                            Search
                        </Button>
                    </FormControl>
                </Container>
            </Container>
        );
    }
}

export default SearchPanel;
