import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBusiness from "./pages/AddBusiness";
import User from "./User";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-business" element={<AddBusiness />} />
                <Route path="/User" element={<User />} />
            </Routes>
        </Router>
    );
}

export default App;
