import * as React from "react";
import { connect } from "react-redux";
import Routes from "../routes/components/Routes";
import { ToastContainer } from "react-toastify";
import Header from "../common/header/Header";
import "react-toastify/dist/ReactToastify.css";
import { StateInterface } from "../../store";
import "./App.scss";

interface Props {
    loader?: any;
}

class App extends React.Component<Props, any> {
    render() {
        return (
            <div className="main-content">
                <Header />
                <Routes />
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

const mapStateToProps = (state: StateInterface) => ({
    loader: state.loader,
});

export default connect(mapStateToProps, {})(App);
