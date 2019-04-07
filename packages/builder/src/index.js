import React from "react";
import ReactDOM from "react-dom";

import brace from "brace";
import "brace/mode/json";
import "brace/theme/crimson_editor";

import { FocusStyleManager } from "@blueprintjs/core";

import App from "./App";

import "../scss/index.scss";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById("root"));

module.hot.accept();
