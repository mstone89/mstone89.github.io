import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Projects from './Projects';
import Bio from './Bio';
import Resume from './Resume';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Link to="/">
                        <h1 className="logo">Molly Codes</h1>
                    </Link>
                    <Link to="/">
                        <p>Projects</p>
                    </Link>
                    <Link to="/bio/">
                        <p>Bio</p>
                    </Link>
                    <Link to="/resume/">
                        <p>Resume</p>
                    </Link>
                    <Switch>
                        <Route exact path="/" component={Projects} />
                        <Route path="/bio/" component={Bio} />
                        <Route path="/resume/" component={Resume} />
                    </Switch>
                </Router>
                <footer>Copyright Molly Stone 2019</footer>
            </div>
        );
    }
}

export default Sidebar;
