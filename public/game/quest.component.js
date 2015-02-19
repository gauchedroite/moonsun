var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require("react/addons");
var TypedReact = require("typed-react");
var ActionCreators = require("./app.actioncreators");
var rce = React.createElement;
var LiSpec = (function (_super) {
    __extends(LiSpec, _super);
    function LiSpec() {
        _super.apply(this, arguments);
    }
    LiSpec.prototype.render = function () {
        return rce("li", {
            className: this.props.className,
            onClick: this._onClick,
            onTouchEnd: this._onTouchEnd
        }, this.props.choice);
    };
    LiSpec.prototype._onClick = function (ev) {
        this.props.onClick(this.props.ix, ev.clientX, ev.clientY);
    };
    LiSpec.prototype._onTouchEnd = function (ev) {
        if (ev.targetTouches.length > 0) {
            var touch = ev.targetTouches[0];
            this.props.onClick(this.props.actionKey, this.props.actionIndex, touch.clientX, touch.clientY);
        }
    };
    return LiSpec;
})(TypedReact.Component);
var liComponent = TypedReact.createClass(LiSpec);
var canvas;
var ctx;
var clockX = 60;
var clockY = 60;
var ClockSpec = (function (_super) {
    __extends(ClockSpec, _super);
    function ClockSpec() {
        _super.apply(this, arguments);
        this.handle = 0;
    }
    ClockSpec.prototype.componentDidMount = function () {
        canvas = this.getDOMNode();
        ctx = canvas.getContext("2d");
    };
    ClockSpec.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.handle != 0) {
            clearTimeout(this.handle);
            this.handle = 0;
        }
        if (this.props.hideClock || this.props.timeoutMax == 0) {
            ctx.clearRect(0, 0, 2 * clockX, 2 * clockY);
            return;
        }
        var drawClock = function () {
            var timeoutMax = _this.props.timeoutMax;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(clockX, clockY, 50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.arc(clockX, clockY, 50, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.closePath();
            var CHUNKS = 100;
            var timeoutChunk = CHUNKS;
            var ontimeout = function () {
                clearTimeout(_this.handle);
                if (timeoutChunk == 0) {
                    _this.props.onTimeout();
                    return;
                }
                else {
                    ctx.fillStyle = "orange";
                    ctx.beginPath();
                    ctx.moveTo(clockX, clockY);
                    ctx.arc(clockX, clockY, 40, 0, (2 * Math.PI) * (CHUNKS - timeoutChunk + 1) / CHUNKS, false);
                    ctx.lineTo(clockX, clockY);
                    ctx.closePath();
                    ctx.fill();
                }
                timeoutChunk--;
                _this.handle = setTimeout(ontimeout, timeoutMax / CHUNKS);
            };
            _this.handle = setTimeout(ontimeout, timeoutMax / CHUNKS);
        };
        setTimeout(drawClock, 100);
    };
    ClockSpec.prototype.render = function () {
        return rce("canvas", null);
    };
    return ClockSpec;
})(TypedReact.Component);
var clockComponent = TypedReact.createClass(ClockSpec);
;
;
var Spec = (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        _super.apply(this, arguments);
        this.detailDiv = null;
        this.questionDiv = null;
    }
    Spec.prototype.getInitialState = function () {
        return { hideChoice: true };
    };
    Spec.prototype.componentDidMount = function () {
        this.props.store.addChangeListener(this._onChange);
        this.detailDiv = this.getDOMNode().parentElement;
        this.questionDiv = this.refs["myQuestion"].getDOMNode();
    };
    Spec.prototype.componentWillUnmount = function () {
        this.props.store.removeAllListeners();
    };
    Spec.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.props.store.hide) {
            setTimeout(function () {
                _this.detailDiv.style.height = "";
            }, 1000);
        }
        else {
            var height = this.questionDiv.clientHeight + 25;
            this.detailDiv.style.height = height.toString() + "px";
        }
    };
    Spec.prototype.render = function () {
        var _this = this;
        var cx = React.addons.classSet({
            "quest": true,
            "my-hide": this.props.store.hide
        });
        var cxc = React.addons.classSet({
            "progress": (this.props.store.hideClock == false),
            "my-hide": this.props.store.hideClock
        });
        var indexSelected = this.props.store.indexSelected;
        var lise = this.props.store.choices.map(function (choice, index) {
            var cxl = React.addons.classSet({
                "my-hide": _this.state.hideChoice,
                "myQuestSelected": (indexSelected != -1 && indexSelected == index),
                "myQuestUnselected": (indexSelected != -1 && indexSelected != index)
            });
            return rce(liComponent, {
                className: cxl,
                key: index,
                ix: index,
                choice: choice,
                onClick: _this._onClick
            }, choice);
        });
        return rce("div", { className: cx }, rce("div", { className: "question", ref: "myQuestion" }, rce("div", null, this.props.store.question), rce("ul", null, lise)), rce("div", { className: cxc }, rce(clockComponent, {
            hideClock: this.props.store.hideClock,
            timeoutMax: this.props.store.timeoutMax,
            onTimeout: this._onTimeout
        })));
    };
    Spec.prototype._onChange = function () {
        var _this = this;
        if (this.props.store.hide == false) {
            this.setState({ hideChoice: true });
            this.setState({ hideChoice: false });
        }
        else {
            this.forceUpdate();
            if (this.props.store.fireNextAction) {
                setTimeout(function () {
                    ActionCreators.fire(_this.props.store.nextAction);
                }, 1000);
            }
        }
    };
    Spec.prototype._onClick = function (index, clientX, clientY) {
        ActionCreators.selectQuest(index);
        ActionCreators.showFeedback(clientX, clientY);
    };
    Spec.prototype._onTimeout = function () {
        ActionCreators.selectQuest(this.props.store.defaultChoice);
    };
    return Spec;
})(TypedReact.Component);
var component = TypedReact.createClass(Spec);
module.exports = component;
