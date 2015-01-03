/// <reference path="typings/react/react.d.ts" />

import React = require("react");

class pager {
    yo(text: string) {
        alert(text);

        var child = React.createElement("h1", null, "the index text was overwritten");
        React.render(child, document.body);
    }
}

var mod = new pager();
export = mod;
