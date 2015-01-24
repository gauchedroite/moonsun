"use strict";
var DescType;
(function (DescType) {
    DescType[DescType["NORMAL"] = 0] = "NORMAL";
    DescType[DescType["ANNOYING"] = 1] = "ANNOYING";
})(DescType || (DescType = {}));
var DescLocation;
(function (DescLocation) {
    DescLocation[DescLocation["NORMAL"] = 0] = "NORMAL";
    DescLocation[DescLocation["CENTER"] = 1] = "CENTER";
})(DescLocation || (DescLocation = {}));
var DescOptions = (function () {
    function DescOptions(options) {
        this.location = options.location;
        this.shake = options.shake;
        this.type = options.type;
        this.backgroundColor = options.backgroundColor;
        this.textColor = options.textColor;
        this.borderColor = options.borderColor;
        this.borderWidth = options.borderWidth;
        this.className = options.className;
    }
    return DescOptions;
})();
var DescOpts = (function () {
    function DescOpts() {
    }
    Object.defineProperty(DescOpts, "AnnoyingCenter", {
        get: function () {
            return new DescOptions({
                type: 1 /* ANNOYING */,
                location: 1 /* CENTER */,
                backgroundColor: "yellow",
                borderColor: "orange",
                borderWidth: 60,
                textColor: "red",
                className: "description-text-annoying"
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DescOpts, "Center", {
        get: function () {
            return new DescOptions({
                location: 1 /* CENTER */,
                className: "description-text-center"
            });
        },
        enumerable: true,
        configurable: true
    });
    return DescOpts;
})();
module.exports = DescOpts;
