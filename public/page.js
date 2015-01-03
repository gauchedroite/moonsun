var React = require("react");
var pager = (function () {
    function pager() {
    }
    pager.prototype.yo = function (text) {
        alert(text);
        var child = React.createElement("h1", null, "the index text was overwritten");
        React.render(child, document.body);
    };
    return pager;
})();
var mod = new pager();
module.exports = mod;
