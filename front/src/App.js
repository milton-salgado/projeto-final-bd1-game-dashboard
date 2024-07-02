import React from "react";
import Header from "./components/Header/index.js";
import Dashboard from "./components/Dashboard/index.js";
import GlobalStyles from "./GlobalStyles.js";

function App() {
    return (
        <div className="app">
            <GlobalStyles />
            <Header />
            <Dashboard />
        </div>
    );
}

export default App;
