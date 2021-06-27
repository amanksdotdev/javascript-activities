import Movies from "./components/Movies";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    //exact --> for exact path match
    //switch ==> when any path matched then return
    //render ==> using render instead of component={} if we want to pass props
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movies" component={Movies} />
                {/* <Route path="/about" component={About} isAuth={true}/> */}
                <Route
                    path="/about"
                    render={(props) => <About {...props} isAuth={true} />}
                />
            </Switch>
        </Router>
    );
}

export default App;
