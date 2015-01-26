var game = require("./GameConstants");
var GameInit = (function () {
    function GameInit(gameWrapperId) {
        var vendorIndex = 0;
        if (window.webkitRequestAnimationFrame)
            vendorIndex = 1;
        game.TRANSFORM = ["transform", "WebkitTransform", "MozTransform"][vendorIndex];
        game.TRANSFORMORIGIN = ["transformOrigin", "WebkitTransformOrigin", "MozTransformOrigin"][vendorIndex];
        game.TRANSITION = ["transition", "WebkitTransition", "MozTransition"][vendorIndex];
        game.ANIMATION = ["animation", "WebkitAnimation", "MozAnimation"][vendorIndex];
        game.STRANSFORM = ["transform", "-webkit-transform", "-moz-transform"][vendorIndex];
        game.STRANSITION = ["transition", "-webkit-transition", "-moz-transition"][vendorIndex];
        game.EVT_TRANSITION_END = ["transitionend", "webkitTransitionEnd", "transitionend"][vendorIndex];
        game.EVT_ANIMATION_END = ["animationend", "webkitAnimationEnd", "animationend"][vendorIndex];
        if (typeof window != 'undefined' && !window.requestAnimationFrame) {
            window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setInterval(callback, 1000 / 60);
            };
        }
        var resize = function () {
            if ((window.innerWidth / window.innerHeight) > game.RATIO) {
                game.DISPLAY_HEIGHT = window.innerHeight;
                game.DISPLAY_WIDTH = game.DISPLAY_HEIGHT * game.RATIO;
                game.DISPLAY_TOP = 0;
                game.DISPLAY_LEFT = (window.innerWidth - game.DISPLAY_WIDTH) / 2;
            }
            else {
                game.DISPLAY_WIDTH = window.innerWidth;
                game.DISPLAY_HEIGHT = game.DISPLAY_WIDTH / game.RATIO;
                game.DISPLAY_LEFT = 0;
                game.DISPLAY_TOP = (window.innerHeight - game.DISPLAY_HEIGHT) / 2;
            }
            game.DISPLAY_SCALE = game.DISPLAY_WIDTH / game.WIDTH;
            var gamePosition = document.getElementById(gameWrapperId);
            var gameScale = gamePosition.getElementsByTagName("div")[0];
            gameScale.style[game.TRANSFORMORIGIN] = "0 0";
            gameScale.style[game.TRANSFORM] = "scale(" + game.DISPLAY_SCALE.toString() + ")";
            gamePosition.style.top = game.DISPLAY_TOP + "px";
            gamePosition.style.left = game.DISPLAY_LEFT + "px";
            gamePosition.style.width = game.DISPLAY_WIDTH + "px";
            gamePosition.style.height = game.DISPLAY_HEIGHT + "px";
        };
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 1);
        resize();
        window.addEventListener("resize", resize.bind(this), false);
    }
    return GameInit;
})();
module.exports = GameInit;
