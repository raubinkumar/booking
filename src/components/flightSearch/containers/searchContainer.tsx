import * as React from "react";
import { connect } from "react-redux";
import SearchPanel from "../components/searchPanel";
import { fetchLocation, searchFlight } from "../actions";
import { SearchInputModel, FlightMainModel } from "../models";
import "../styles/flightSearch.scss";
import ResultGrid from "../components/resultGrid";
import { Container } from "@material-ui/core";
import { toast } from "react-toastify";

export interface SearchProps {
    fetchLocation?: () => {};
    searchFlight?: (query: SearchInputModel) => {};
    flight: FlightMainModel;
}

class SearchContainer extends React.Component<SearchProps, {}> {
    onSearch = (query: SearchInputModel) => {
        this.props.searchFlight(query);
    };
    componentDidMount() {
        this.props.fetchLocation();
    }

    render() {
        if (this.props.flight.error) {
            toast.error(this.props.flight.error);
        }
        return (
            <React.Fragment>
                <Container maxWidth="lg" className="body-container">
                    <SearchPanel
                        locations={this.props.flight.locations}
                        onSearch={this.onSearch}
                    />
                    <ResultGrid
                        isLoading={this.props.flight.loading}
                        result={this.props.flight.searchResults}
                    />
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { flight } = state;
    console.log(state);
    return {
        flight,
    };
};

const mapDispatchToProps = {
    fetchLocation,
    searchFlight,
};

export default connect<any, any, any>(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);
