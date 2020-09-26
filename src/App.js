import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Layouts from "./Layouts";
import "./App.less";

function App() {
    return ( <
        >
        <
        Router >
        <
        Provider store = { store } > { " " } <
        Layouts > < /Layouts>{" "} <
        /Provider>{" "} <
        /Router>{" "} <
        />
    );
}

export default App;