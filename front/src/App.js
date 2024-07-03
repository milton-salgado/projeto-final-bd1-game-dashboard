import React from "react";
import Header from "./components/Header/index.js";
import Dashboard from "./components/Dashboard/index.js";
import GlobalStyles from "./GlobalStyles.js";
import Footer from "./components/Footer/index.js";

function App() {
    return (
        <div className="app">
            <GlobalStyles />
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
}

export default App;
