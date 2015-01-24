var GameConstants = (function () {
    function GameConstants() {
        this.TRANSFORM = "";
        this.TRANSFORMORIGIN = "";
        this.TRANSITION = "";
        this.ANIMATION = "";
        this.STRANSFORM = "";
        this.STRANSITION = "";
        this.EVT_TRANSITION_END = "";
        this.EVT_ANIMATION_END = "";
        this.WIDTH = 960;
        this.HEIGHT = 540;
        this.RATIO = 960 / 540;
        this.DISPLAY_TOP = 0;
        this.DISPLAY_LEFT = 0;
        this.DISPLAY_WIDTH = 0;
        this.DISPLAY_HEIGHT = 0;
        this.DISPLAY_SCALE = 0;
    }
    return GameConstants;
})();
var game = new GameConstants();
module.exports = game;
