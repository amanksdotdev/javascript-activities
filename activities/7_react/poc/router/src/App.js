import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

function App() {
    return (
        <Router>
            <div>
                <Route path="/" render={Home} />
            </div>
        </Router>
    );
}

export default App;
