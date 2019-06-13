import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Sidebar extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Link to="/">
                        <h1 className="logo">Molly Codes</h1>
                    </Link>
                    <Switch>
                        <Route exact path="/" component={Projects} />
                        <Route path="/bio/" component={Bio} />
                        <Route path="/resume/" component={Resume} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Sidebar;
