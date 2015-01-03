/// <reference path="typings/react/react.d.ts" />

import React = require("react");
import pager = require("./page");

var child = React.createElement("h1", null, "index is loaded");
React.render(child, document.body);

pager.yo("the page module is now being loaded");
