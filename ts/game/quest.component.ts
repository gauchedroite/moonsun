
import React = require("react/addons");
import TypedReact = require("typed-react");
import ActionCreators = require("./app.actioncreators");
//
import Store = require("./quest.store");

var rce = React.createElement;


/***************************************************************/
class LiSpec extends TypedReact.Component<any, any> {
    render() {
        return rce("li", {
            className: this.props.className,
            onClick: this._onClick,
            onTouchEnd: this._onTouchEnd
        }, this.props.choice);
    }

    private _onClick(ev: React.MouseEvent) {
        this.props.onClick(this.props.ix, ev.clientX, ev.clientY);
    }
    private _onTouchEnd(ev: React.TouchEvent) {
        if (ev.targetTouches.length > 0) {
            var touch = ev.targetTouches[0];
            this.props.onClick(this.props.actionKey, this.props.actionIndex, touch.clientX, touch.clientY);
        }
    }
}
var liComponent = TypedReact.createClass(LiSpec);



/***************************************************************/
var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var clockX = 60;
var clockY = 60;

class ClockSpec extends TypedReact.Component<any, any> {
    handle = 0;

    componentDidMount() {
        canvas = <HTMLCanvasElement>this.getDOMNode();
        ctx = canvas.getContext("2d");
    }
    componentDidUpdate() {
        if (this.handle != 0) {
            clearTimeout(this.handle);
            this.handle = 0;
        }
        if (this.props.hideClock || this.props.timeoutMax == 0) {
            ctx.clearRect(0, 0, 2 * clockX, 2 * clockY);
            return;
        }

        var drawClock = () => {
            var timeoutMax = this.props.timeoutMax;

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
            var ontimeout = () => {
                clearTimeout(this.handle);
                if (timeoutChunk == 0) {
                    this.props.onTimeout();
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
                this.handle = setTimeout(ontimeout, timeoutMax / CHUNKS);
            };
            this.handle = setTimeout(ontimeout, timeoutMax / CHUNKS);
        };

        setTimeout(drawClock, 100);
    }

    render() {
        return rce("canvas", null);
    }
}
var clockComponent = TypedReact.createClass(ClockSpec);



/***************************************************************/
interface IProps {
    store: Store
};

interface IState {
    hideChoice: boolean;
};

class Spec extends TypedReact.Component<IProps, IState> {
    detailDiv: HTMLElement = null;
    questionDiv: HTMLElement = null;

    getInitialState(): IState {
        return { hideChoice: true }
    }

    componentDidMount() {
        this.props.store.addChangeListener(this._onChange);
        this.detailDiv = (<HTMLElement>this.getDOMNode()).parentElement;
        this.questionDiv = <HTMLElement>this.refs["myQuestion"].getDOMNode();
    }
    componentWillUnmount() {
        this.props.store.removeAllListeners();
    }
    componentDidUpdate() {
        if (this.props.store.hide) {
            setTimeout(() => {
                this.detailDiv.style.height = "";
            }, 1000);
        }
        else {
            var height = this.questionDiv.clientHeight + 25;
            this.detailDiv.style.height = height.toString() + "px";
        }
    }

    //
    // render
    //
    render() {
        var cx = React.addons.classSet({
            "quest": true,
            "my-hide": this.props.store.hide
        });
        var cxc = React.addons.classSet({
            "progress": (this.props.store.hideClock == false),
            "my-hide": this.props.store.hideClock
        });

        var indexSelected = this.props.store.indexSelected;
        //
        var lise = this.props.store.choices.map((choice, index) => {
            var cxl = React.addons.classSet({
                "my-hide": this.state.hideChoice,
                "myQuestSelected": (indexSelected != -1 && indexSelected == index),
                "myQuestUnselected": (indexSelected != -1 && indexSelected != index)
            });
            return rce(liComponent, {
                className: cxl,
                key: index,
                ix: index,
                choice: choice,
                onClick: this._onClick
            }, choice);
        });

        return rce("div", { className: cx },
            rce("div", { className: "question", ref: "myQuestion" },
                rce("div", null, this.props.store.question),
                rce("ul", null,
                    lise
                    )
                ),
            rce("div", { className: cxc },
                rce(clockComponent, {
                    hideClock: this.props.store.hideClock,
                    timeoutMax: this.props.store.timeoutMax,
                    onTimeout: this._onTimeout
                })
                )
            );
    }

    //
    // Private methods
    //
    private _onChange() {
        if (this.props.store.hide == false) {
            this.setState({ hideChoice: true });
            this.setState({ hideChoice: false });
        }
        else {
            this.forceUpdate();
            if (this.props.store.fireNextAction) {
                setTimeout(() => {
                    ActionCreators.fire(this.props.store.nextAction);
                }, 1000);//Leave time for the selected answer to blink
            }
        }
    }

    private _onClick(index: number, clientX: number, clientY: number) {
        ActionCreators.selectQuest(index);
        ActionCreators.showFeedback(clientX, clientY);
    }

    private _onTimeout() {
        ActionCreators.selectQuest(this.props.store.defaultChoice);
    }
}



var component = TypedReact.createClass(Spec);
export = component;
