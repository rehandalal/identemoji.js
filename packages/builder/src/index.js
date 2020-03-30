import React from "react";
import ReactDOM from "react-dom";

// Import for side effects
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-crimson_editor";

import { FocusStyleManager } from "@blueprintjs/core";

import App from "./App";

import "../scss/index.scss";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById("root"));

module.hot.accept();
