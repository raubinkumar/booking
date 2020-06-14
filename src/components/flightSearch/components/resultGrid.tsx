import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Container,
    TableContainer,
    TableHead,
    Paper,
    TablePagination,
} from "@material-ui/core";
import { SearchResultModel } from "../models/searchResultModel";

export interface ResultProps {
    result: SearchResultModel[];
}

interface ResultState {
    pageNo: number;
    rowsPerPage: number;
}

class ResultGrid extends React.Component<ResultProps, ResultState> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            pageNo: 0,
            rowsPerPage: 10,
        };
    }

    setPage = (pageNo: number) => {
        this.setState({ pageNo });
    };
    setRowsPerPage = (rowsPerPage: number) => {
        this.setState({ rowsPerPage });
    };
    handleChangePage = (event: any, newPage: number) => {
        this.setPage(newPage);
    };

    handleChangeRowsPerPage = (event: any) => {
        this.setRowsPerPage(event.target.value);
        this.setPage(0);
    };

    render() {
        const rows = this.props.result;
        const { pageNo, rowsPerPage } = this.state;
        return (
            <Container>
                {rows && rows.length > 0 ? (
                    <Paper>
                        <TableContainer
                            component={Paper}
                            className="search-result-grid"
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Flight Number</TableCell>
                                        <TableCell align="right">
                                            Airline Name
                                        </TableCell>
                                        <TableCell align="right">
                                            Source
                                        </TableCell>
                                        <TableCell align="right">
                                            Destination
                                        </TableCell>
                                        <TableCell align="right">
                                            Departure
                                        </TableCell>
                                        <TableCell align="right">
                                            Arrival
                                        </TableCell>
                                        <TableCell align="right">
                                            Duration
                                        </TableCell>
                                        <TableCell align="right">
                                            Stops
                                        </TableCell>
                                        <TableCell align="right">
                                            Price
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(
                                            pageNo * rowsPerPage,
                                            pageNo * rowsPerPage + rowsPerPage
                                        )
                                        .map((row) => (
                                            <TableRow key={row.flightNumber}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.flightNumber}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.airlineName}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.from}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.to}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.departureTime}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.arrivalTime}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.duration}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.stops}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {`₹${row.price}`}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.pageNo}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                ) : (
                    rows && (
                        <div className="no-result-found">
                            No flight available
                        </div>
                    )
                )}
            </Container>
        );
    }
}

export default ResultGrid;
