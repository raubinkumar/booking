import * as React from "react";
import "./header.scss";

export interface HeaderProps {}

interface State {
    activeTab: any;
}

const Tabs = {
    Home: "Home",
    Bookings: "Bookings",
};

class Header extends React.Component<HeaderProps, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            activeTab: Tabs.Home,
        };
    }

    changeTab = (tab: any) => {
        this.setState({ activeTab: tab });
    };

    render() {
        //const { activeTab } = this.state;
        return (
            <div className="header">
                <a
                    href="/"
                    className="logo"
                    onClick={() => this.changeTab(Tabs.Home)}
                >
                    Flights
                </a>
                <div className="header-right">
                    {/* <a
                        className={activeTab === Tabs.Home ? "active" : ""}
                        href="/"
                        onClick={() => this.changeTab(Tabs.Home)}
                    >
                        {Tabs.Home}
                    </a>
                    <a
                        className={activeTab === Tabs.Bookings ? "active" : ""}
                        href="/bookings"
                        onClick={() => this.changeTab(Tabs.Bookings)}
                    >
                        {Tabs.Bookings}
                    </a> */}
                </div>
            </div>
        );
    }
}

export default Header;
