webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
	var pager = __webpack_require__(3);
	var child = React.createElement("h1", null, "index is loaded");
	React.render(child, document.body);
	pager.yo("the page module is now being loaded");


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
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


/***/ }
]);