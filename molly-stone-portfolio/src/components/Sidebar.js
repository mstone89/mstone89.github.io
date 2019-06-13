import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Projects from './Projects';
import Bio from './Bio';
import Resume from './Resume';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <Router>
                    <header>
                        <Link to="/">
                            <h1 className="logo">Molly Codes</h1>
                        </Link>
                        <div className="social-media">
                            <a href="https://www.linkedin.com/in/mollycstone/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                            <a href="https://github.com/mstone89/" rel="noopener noreferrer" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://medium.com/@molly.stone89" rel="noopener noreferrer" target="_blank"><i className="fab fa-medium"></i></a>
                        </div>
                        <nav>
                            <Link to="/">
                                <p>Projects</p>
                            </Link>
                            <Link to="/bio/">
                                <p>Bio</p>
                            </Link>
                            <Link to="/resume/">
                                <p>Resume</p>
                            </Link>
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path="/" component={Projects} />
                        <Route path="/bio/" component={Bio} />
                        <Route path="/resume/" component={Resume} />
                    </Switch>
                </Router>
                <footer><i className="far fa-copyright"></i> Molly Stone 2019</footer>
            </div>
        );
    }
}

export default Sidebar;
