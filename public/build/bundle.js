webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Game = __webpack_require__(6);
	var Level = __webpack_require__(7);
	var GameInit = __webpack_require__(8);
	var AppComponent = __webpack_require__(9);
	var AppStore = __webpack_require__(10);
	var css = __webpack_require__(19);
	window.onload = function () {
	    var store = new AppStore();
	    React.initializeTouchEvents(true);
	    var appElement = React.createElement(AppComponent, null);
	    React.render(appElement, document.getElementById("id-game-wrapper"));
	    document.body.classList.remove("preload");
	    new GameInit("id-game-wrapper");
	    var game = new Game(store);
	    var level = new Level(game);
	    game.Play(level);
	};


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Anim = __webpack_require__(14);
	var Misc = __webpack_require__(15);
	var xData = __webpack_require__(16);
	var Question = __webpack_require__(17);
	var Game = (function () {
	    function Game(runner) {
	        this.runner = runner;
	        this.gameDataList = new xData.GameDataList();
	        this.gameState = new xData.GameState();
	        return this;
	    }
	    Game.prototype.clearAllState = function () {
	        this.gameState.Clear();
	        this.gameDataList.Clear();
	    };
	    Game.prototype.saveAllState = function () {
	        this.gameState.Save();
	        this.gameDataList.Save();
	    };
	    Game.prototype.loadAllState = function () {
	        this.gameState.Load();
	        this.gameDataList.Load();
	    };
	    Game.prototype.getVar = function (key, defValue) {
	        var data = this.gameState.data[key];
	        return (data != undefined ? data : defValue);
	    };
	    Game.prototype.setVar = function (key, val) {
	        return this.gameState.data[key] = val;
	    };
	    Game.prototype.addAnim = function (anim) {
	        this.gameDataList.add(anim);
	    };
	    Game.prototype.addQuestion = function (question) {
	        this.gameDataList.add(question);
	    };
	    Game.prototype.newAnim = function (level) {
	        return new Anim(level);
	    };
	    Game.prototype.newQuestion = function (level) {
	        return new Question(level);
	    };
	    Game.prototype.onGameEvent = function (eventName) {
	        this.clearAllState();
	    };
	    Game.prototype.Play = function (level) {
	        var _this = this;
	        level.load();
	        var playing = null;
	        var ready = false;
	        this.runner.ready();
	        this.runner.onGameEvent = this.onGameEvent.bind(this);
	        this.clearAllState();
	        this.loadAllState();
	        var playnext = function () {
	            if (playing != null) {
	                if (playing.funDone_curious_internal != undefined)
	                    playing.funDone_curious_internal();
	                _this.saveAllState();
	            }
	            var readyList = new Array();
	            for (var index = 0; index < _this.gameDataList.length; index++) {
	                var gameData = _this.gameDataList.at(index);
	                if (gameData.processed == false) {
	                    ready = gameData.playable.funWhen_curious_internal();
	                    if (ready)
	                        readyList.push(gameData);
	                }
	            }
	            if (readyList.length == 0) {
	                _this.runner.gameOver();
	                _this.clearAllState();
	                return;
	            }
	            else {
	                var index = Misc.randomFromInterval(0, readyList.length - 1);
	                var gameData = readyList[index];
	                playing = gameData.playable;
	                gameData.playable.play_curious_internal(_this.runner, playnext);
	                gameData.processed = true;
	            }
	        };
	        playnext();
	    };
	    return Game;
	})();
	module.exports = Game;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(15);
	var DescOpts = __webpack_require__(18);
	var Level_001_Intro = (function () {
	    function Level_001_Intro(game) {
	        this.game = game;
	        this.imgFolder = "/assets/level_001/img/";
	        this.JACK = "jack_small.jpg";
	        this.SPECKY = "specky_1920_low_2.jpg";
	        this.MASKINER = "gangmaskiner_1920_badge_small.jpg";
	        this.PC_intro = 0.0;
	        this.PC_blesses = 1.0;
	        this.PC_accident = 2.0;
	        this.PC_encore = 3.0;
	        this.PC_pourri = 4.0;
	        this.PC_qaz = 5.0;
	        this.PC_gameover = 99.0;
	    }
	    Object.defineProperty(Level_001_Intro.prototype, "pc", {
	        get: function () {
	            return this.game.getVar("pc", 0);
	        },
	        set: function (val) {
	            this.game.setVar("pc", val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Level_001_Intro.prototype, "attrib", {
	        get: function () {
	            return this.game.getVar("attrib", 0);
	        },
	        set: function (val) {
	            this.game.setVar("attrib", val);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Level_001_Intro.prototype.load = function () {
	        var _this = this;
	        var game = this.game;
	        game.runner.preload([this.imgFolder + this.JACK, this.imgFolder + this.SPECKY, this.imgFolder + this.MASKINER]);
	        this.Accident(game);
	        this.Duchesse(game);
	        game.addAnim(game.newAnim(this).when(function () {
	            return _this.pc == _this.PC_intro;
	        }).done(function () {
	            _this.pc = _this.PC_blesses;
	        }).show("Matante", this.SPECKY, {
	            when: function () {
	                return true;
	            },
	            done: function () {
	                _this.attrib = 42;
	            }
	        }).value());
	        var LaFemmeEstSeule = function () {
	            game.runner.popMessage("et je ne sais pas pourquoi...");
	            _this.pc = _this.PC_encore;
	        };
	        game.addQuestion(game.newQuestion(this).when(function () {
	            return _this.pc == _this.PC_blesses;
	        }).show("fraktarna", "gaussfraktarna_1920_badge_small.jpg").head("Jack", this.JACK).ask("Est-ce que je devrais voir s'il y a d'autres blessés?").choice("Non, la femme a besoin d'aide immédiatement!", function () {
	            _this.pc = _this.PC_qaz;
	        }, function () {
	            return true;
	        }).choice("Non, elle semble seule", LaFemmeEstSeule).choice("Non, j'appelle le 9-1-1", this.Call911).timeout(Utils.Delay_Normal, 0).value());
	        game.addQuestion(game.newQuestion(this).when(function () {
	            return _this.pc == _this.PC_encore;
	        }).show("maskiner", "gangmaskiner_1920_badge_small.jpg").head("jack", this.JACK).ask("Une autre question?").choice("Non, la femme a besoin d'aide immédiatement!", function () {
	            _this.pc = _this.PC_pourri;
	        }).choice("Non, elle semble seule", LaFemmeEstSeule).timeout(Utils.Delay_Fast, 0).value());
	        game.addAnim(game.newAnim(this).when(function () {
	            return _this.pc == _this.PC_pourri;
	        }).done(function () {
	            _this.pc = _this.PC_gameover;
	        }).show("La badge", "spanviken_1920_badge_small.jpg").head("Jack", this.JACK).line("assez pourri...").description("c'est la fin de mon histoire").description("désolé de la perte de temps...", DescOpts.Center).value());
	    };
	    Level_001_Intro.prototype.Call911 = function () {
	        this.pc = this.PC_gameover;
	    };
	    Level_001_Intro.prototype.Accident = function (game) {
	        var _this = this;
	        game.addAnim(game.newAnim(this).when(function () {
	            return _this.pc == _this.PC_accident;
	        }).done(function () {
	            _this.pc = _this.PC_encore;
	        }).show("C'est piquant", this.SPECKY).description("TUUUUUUUUUUUUUU uuuuu .. uuuuuu UUUUUUUUU", DescOpts.AnnoyingCenter).description("Une femme, du même âge que Jack environ, est coincée dans la voiture.").description("TUUuuUUUuuuuuUUUUUU UUUUUUUUUUUUU", DescOpts.AnnoyingCenter).head("Jack", this.JACK).line("...").line("..a.. ....té.. ... arr...").description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter).value());
	    };
	    Level_001_Intro.prototype.Qaz = function (game) {
	        var _this = this;
	        game.addAnim(game.newAnim(this).when(function () {
	            return _this.pc == _this.PC_qaz;
	        }).done(function () {
	            _this.pc = _this.PC_encore;
	        }).show("C'est piquant", this.SPECKY).head("Jack", this.JACK).line("...").line("..a.. ....té.. ... arr...").description("TUUuuuuuUUUUUUUUuu uuuuuu", DescOpts.AnnoyingCenter).value());
	    };
	    Level_001_Intro.prototype.Duchesse = function (game) {
	        var _this = this;
	        game.addQuestion(game.newQuestion(this).when(function () {
	            return _this.pc == _this.PC_qaz + 1;
	        }).show("fraktarna", "gaussfraktarna_1920_badge_small.jpg").head("Jack", this.JACK).ask("Comment sont les chemises de la duchesse?").choice("Archi froissées", function () {
	            _this.pc = _this.PC_intro;
	        }, function () {
	            return true;
	        }).choice("Blanches", this.Call911).timeout(Utils.Delay_Normal, 0).value());
	    };
	    return Level_001_Intro;
	})();
	module.exports = Level_001_Intro;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var game = __webpack_require__(43);
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	var ActionCreators = __webpack_require__(21);
	var AppStore = __webpack_require__(10);
	var cinema = __webpack_require__(22);
	var title = __webpack_require__(23);
	var description = __webpack_require__(24);
	var pop = __webpack_require__(25);
	var detail = __webpack_require__(26);
	var head = __webpack_require__(27);
	var talk = __webpack_require__(28);
	var quest = __webpack_require__(29);
	var clicker = __webpack_require__(30);
	var feedback = __webpack_require__(31);
	var menu = __webpack_require__(32);
	;
	var getStateFromStores = function () {
	    return {
	        app: AppStore.getApp(),
	        cinema: AppStore.getCinema(),
	        description: AppStore.getDescription(),
	        pop: AppStore.getPop(),
	        head: AppStore.getHead(),
	        talk: AppStore.getTalk(),
	        quest: AppStore.getQuest(),
	        menu: AppStore.getMenu()
	    };
	};
	var AppSpec = (function (_super) {
	    __extends(AppSpec, _super);
	    function AppSpec() {
	        _super.apply(this, arguments);
	        this._handleOnMenu = function () {
	            ActionCreators.showMenu();
	        };
	    }
	    AppSpec.prototype.getInitialState = function () {
	        return getStateFromStores();
	    };
	    AppSpec.prototype.render = function () {
	        return React.createElement("div", { className: "game layer", tabIndex: "1", style: { zIndex: "1" } }, React.createElement(cinema, { store: this.state.cinema }), React.createElement(description, { store: this.state.description }), React.createElement(pop, { store: this.state.pop }), React.createElement("div", { className: "main" }, React.createElement(title, { store: this.state.cinema }), React.createElement(detail, { talk: this.state.talk, quest: this.state.quest }, React.createElement(head, { store: this.state.head }), React.createElement(talk, { store: this.state.talk }), React.createElement(quest, { store: this.state.quest }))), React.createElement(clicker, { store: this.state.app }), React.createElement(menu, { store: this.state.menu }), React.createElement(feedback, { store: this.state.app }), React.createElement("svg", { className: "svg", onClick: this._handleOnMenu, onTouchEnd: this._handleOnMenu }, React.createElement("g", { transform: "translate(40,0)" }, React.createElement("circle", { r: "40", fill: "#23b0ff" }), React.createElement("path", { d: "M-25,-10 A25,25 0 0,0 -25,10", stroke: "white", strokeWidth: "5", fill: "none", transform: "rotate(-45)" }))));
	    };
	    return AppSpec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(AppSpec);
	module.exports = component;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Payload = __webpack_require__(33);
	var dispatcher = __webpack_require__(34);
	var CinemaStore = __webpack_require__(35);
	var DescriptionStore = __webpack_require__(36);
	var HeadStore = __webpack_require__(37);
	var PopStore = __webpack_require__(38);
	var TalkStore = __webpack_require__(39);
	var QuestStore = __webpack_require__(40);
	var MenuStore = __webpack_require__(41);
	var ActionCreators = __webpack_require__(21);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var cinema = new CinemaStore();
	var description = new DescriptionStore();
	var pop = new PopStore();
	var head = new HeadStore();
	var talk = new TalkStore();
	var quest = new QuestStore();
	var menu = new MenuStore();
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.hideClicker = false;
	        this.feedbackX = -1;
	        this.feedbackY = -1;
	        this.showFeedback = false;
	        this.selectedQuest = -1;
	        this.ready = function () {
	        };
	        this.showAnim = function (text, url, nextEvent, immediate) {
	            ActionCreators.showAnim(text, url, nextEvent);
	        };
	        this.showDescription = function (text, nextEvent, options) {
	            ActionCreators.showDescription(text, nextEvent);
	            _this.animEvent = function () {
	                ActionCreators.hideDescription();
	                setTimeout(nextEvent, 150);
	            };
	        };
	        this.setHead = function (talker, url, nextEvent) {
	            ActionCreators.setHead(talker, url);
	            setTimeout(nextEvent, 0);
	        };
	        this.showLine = function (line, nextEvent) {
	            ActionCreators.showLine(line, nextEvent);
	            _this.animEvent = function () {
	                ActionCreators.hideLine();
	                setTimeout(nextEvent, 0);
	            };
	        };
	        this.showQuestion = function (question, choices, timeoutMax, defaultChoice, answerEvent) {
	            ActionCreators.showQuest(question, choices, timeoutMax, defaultChoice, answerEvent);
	        };
	        this.popMessage = function (message) {
	            ActionCreators.showPop(message);
	            setTimeout(function () {
	                ActionCreators.hidePop();
	            }, 3000);
	        };
	        this.gameOver = function () {
	            alert("GAME OVER");
	        };
	        this.log = function (text) {
	        };
	        this.preload = function (assets) {
	        };
	        window.appStore = this;
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            var data = action.data;
	            switch (action.type) {
	                case ActionTypes.CLICK:
	                    setTimeout(_this.animEvent, 0);
	                    break;
	                case ActionTypes.SHOW_ANIM:
	                case ActionTypes.SHOW_DESCRIPTION:
	                case ActionTypes.SHOW_LINE:
	                    _this.animEvent = data.nextEvent;
	                    break;
	                case ActionTypes.SHOW_QUEST:
	                    _this.answerEvent = data.answerEvent;
	                    _this.hideClicker = true;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.SELECT_QUEST:
	                    _this.hideClicker = false;
	                    _this.selectedQuest = data.index;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.QUEST_ANIM_DONE:
	                    setTimeout(function () {
	                        _this.answerEvent(_this.selectedQuest);
	                    }, 0);
	                    break;
	                case ActionTypes.SHOW_FEEDBACK:
	                    _this.feedbackX = data.clientX;
	                    _this.feedbackY = data.clientY;
	                    _this.showFeedback = true;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.HIDE_FEEDBACK:
	                    _this.showFeedback = false;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    Store.getApp = function () {
	        return window.appStore;
	    };
	    Store.getCinema = function () {
	        return cinema;
	    };
	    Store.getDescription = function () {
	        return description;
	    };
	    Store.getPop = function () {
	        return pop;
	    };
	    Store.getHead = function () {
	        return head;
	    };
	    Store.getTalk = function () {
	        return talk;
	    };
	    Store.getQuest = function () {
	        return quest;
	    };
	    Store.getMenu = function () {
	        return menu;
	    };
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Misc = __webpack_require__(15);
	var AnimData = (function () {
	    function AnimData(level, type, text, url, options, whendone) {
	        this.level = level;
	        this.type = type;
	        this.text = text;
	        this.url = url;
	        this.options = options;
	        if (whendone != undefined) {
	            if (whendone.when != undefined)
	                this.when = whendone.when.bind(this.level);
	            if (whendone.done != undefined)
	                this.done = whendone.done.bind(this.level);
	        }
	    }
	    return AnimData;
	})();
	var AnimType;
	(function (AnimType) {
	    AnimType[AnimType["SHOW"] = 0] = "SHOW";
	    AnimType[AnimType["DESC"] = 1] = "DESC";
	    AnimType[AnimType["HEAD"] = 2] = "HEAD";
	    AnimType[AnimType["LINE"] = 3] = "LINE";
	})(AnimType || (AnimType = {}));
	var Anim = (function () {
	    function Anim(level) {
	        this.level = level;
	        this.data = new Array();
	        this.funWhen_curious_internal = function () {
	            return false;
	        };
	        this.funDone_curious_internal = function () {
	        };
	        return this;
	    }
	    Anim.prototype.show = function (title, url, whendone) {
	        this.data.push(new AnimData(this.level, 0 /* SHOW */, title, url, null, whendone));
	        return this;
	    };
	    Anim.prototype.description = function (text, options, whendone) {
	        this.data.push(new AnimData(this.level, 1 /* DESC */, text, null, options, whendone));
	        return this;
	    };
	    Anim.prototype.head = function (name, url) {
	        this.data.push(new AnimData(this.level, 2 /* HEAD */, name, url, null));
	        return this;
	    };
	    Anim.prototype.line = function (text, whendone) {
	        this.data.push(new AnimData(this.level, 3 /* LINE */, text, null, null, whendone));
	        return this;
	    };
	    Anim.prototype.value = function () {
	        return this;
	    };
	    Anim.prototype.when = function (fun) {
	        this.funWhen_curious_internal = fun.bind(this.level);
	        return this;
	    };
	    Anim.prototype.done = function (fun) {
	        this.funDone_curious_internal = fun.bind(this.level);
	        return this;
	    };
	    Anim.prototype.play_curious_internal = function (runner, completed) {
	        var _this = this;
	        var index = 0;
	        var currentData;
	        var iterateAnim = function () {
	            while (index != _this.data.length) {
	                currentData = _this.data[index];
	                index++;
	                var ok = true;
	                if (currentData.when != undefined)
	                    ok = currentData.when();
	                if (ok) {
	                    return currentData;
	                }
	            }
	            return null;
	        };
	        var onnext = function () {
	            if (currentData != undefined && currentData.done != undefined)
	                currentData.done();
	            var data = iterateAnim();
	            if (data == null) {
	                completed();
	                return;
	            }
	            runProper(runner, data, onnext);
	        };
	        var runProper = function (runner, data, nextEvent) {
	            if (data.type == 0 /* SHOW */) {
	                runner.showAnim(data.text, Misc.fixText(_this.level, _this.level.imgFolder + data.url), nextEvent);
	            }
	            else if (data.type == 1 /* DESC */) {
	                runner.showDescription(Misc.fixText(_this.level, data.text), nextEvent, data.options);
	            }
	            else if (data.type == 3 /* LINE */) {
	                runner.showLine(Misc.fixText(_this.level, data.text), nextEvent);
	            }
	            else if (data.type == 2 /* HEAD */) {
	                runner.setHead(data.text, _this.level.imgFolder + data.url, nextEvent);
	            }
	        };
	        runProper(runner, iterateAnim(), onnext);
	    };
	    return Anim;
	})();
	module.exports = Anim;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var InputKey;
	(function (InputKey) {
	    InputKey[InputKey["Num1"] = 97] = "Num1";
	    InputKey[InputKey["Num2"] = 98] = "Num2";
	    InputKey[InputKey["Num3"] = 99] = "Num3";
	    InputKey[InputKey["Num4"] = 100] = "Num4";
	    InputKey[InputKey["Num5"] = 101] = "Num5";
	    InputKey[InputKey["Num6"] = 102] = "Num6";
	    InputKey[InputKey["Num7"] = 103] = "Num7";
	    InputKey[InputKey["Num8"] = 104] = "Num8";
	    InputKey[InputKey["Num9"] = 105] = "Num9";
	    InputKey[InputKey["Num0"] = 96] = "Num0";
	    InputKey[InputKey["Numlock"] = 144] = "Numlock";
	    InputKey[InputKey["Semicolon"] = 186] = "Semicolon";
	    InputKey[InputKey["ZERO"] = 48] = "ZERO";
	    InputKey[InputKey["ONE"] = 49] = "ONE";
	    InputKey[InputKey["TWO"] = 50] = "TWO";
	    InputKey[InputKey["THREE"] = 51] = "THREE";
	    InputKey[InputKey["FOUR"] = 52] = "FOUR";
	    InputKey[InputKey["FIVE"] = 53] = "FIVE";
	    InputKey[InputKey["SIX"] = 54] = "SIX";
	    InputKey[InputKey["SEVEN"] = 55] = "SEVEN";
	    InputKey[InputKey["EIGHT"] = 56] = "EIGHT";
	    InputKey[InputKey["NINE"] = 57] = "NINE";
	    InputKey[InputKey["A"] = 65] = "A";
	    InputKey[InputKey["B"] = 66] = "B";
	    InputKey[InputKey["C"] = 67] = "C";
	    InputKey[InputKey["D"] = 68] = "D";
	    InputKey[InputKey["E"] = 69] = "E";
	    InputKey[InputKey["F"] = 70] = "F";
	    InputKey[InputKey["G"] = 71] = "G";
	    InputKey[InputKey["H"] = 72] = "H";
	    InputKey[InputKey["I"] = 73] = "I";
	    InputKey[InputKey["J"] = 74] = "J";
	    InputKey[InputKey["K"] = 75] = "K";
	    InputKey[InputKey["L"] = 76] = "L";
	    InputKey[InputKey["M"] = 77] = "M";
	    InputKey[InputKey["N"] = 78] = "N";
	    InputKey[InputKey["O"] = 79] = "O";
	    InputKey[InputKey["P"] = 80] = "P";
	    InputKey[InputKey["Q"] = 81] = "Q";
	    InputKey[InputKey["R"] = 82] = "R";
	    InputKey[InputKey["S"] = 83] = "S";
	    InputKey[InputKey["T"] = 84] = "T";
	    InputKey[InputKey["U"] = 85] = "U";
	    InputKey[InputKey["V"] = 86] = "V";
	    InputKey[InputKey["W"] = 87] = "W";
	    InputKey[InputKey["X"] = 88] = "X";
	    InputKey[InputKey["Y"] = 89] = "Y";
	    InputKey[InputKey["Z"] = 90] = "Z";
	    InputKey[InputKey["Shift"] = 16] = "Shift";
	    InputKey[InputKey["Alt"] = 18] = "Alt";
	    InputKey[InputKey["Up"] = 38] = "Up";
	    InputKey[InputKey["Down"] = 40] = "Down";
	    InputKey[InputKey["Left"] = 37] = "Left";
	    InputKey[InputKey["Right"] = 39] = "Right";
	    InputKey[InputKey["Space"] = 32] = "Space";
	    InputKey[InputKey["Esc"] = 27] = "Esc";
	})(InputKey || (InputKey = {}));
	var Misc = (function () {
	    function Misc() {
	    }
	    Misc.randomFromInterval = function (from, to) {
	        return Math.floor(Math.random() * (to - from + 1) + from);
	    };
	    Misc.markdown = function (text) {
	        if (text == null)
	            return null;
	        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(new RegExp('//(.*?)//', 'g'), '<em>$1</em>');
	    };
	    Misc.fixText = function (level, text) {
	        var txt = Misc.markdown(text);
	        var interpolated = txt;
	        var re = /\$\{(.*?)\}/g;
	        var match;
	        while ((match = re.exec(txt)) != null) {
	            interpolated = interpolated.replace(match[0], level[match[1]]);
	        }
	        return interpolated;
	    };
	    Misc.getPx = function (styleTop) {
	        var top = +styleTop.replace("px", "");
	        return top;
	    };
	    Misc.Delay_None = 0;
	    Misc.Delay_Slow = 5000;
	    Misc.Delay_Normal = 3000;
	    Misc.Delay_Fast = 2000;
	    return Misc;
	})();
	var Rect = (function () {
	    function Rect(left, top, width, height) {
	        if (left === void 0) { left = 0; }
	        if (top === void 0) { top = 0; }
	        if (width === void 0) { width = 0; }
	        if (height === void 0) { height = 0; }
	        this.left = left;
	        this.top = top;
	        this.width = width;
	        this.height = height;
	    }
	    Rect.prototype.hitBy = function (x, y) {
	        return (x >= this.left && x <= (this.left + this.width) && y >= this.top && y <= (this.top + this.height));
	    };
	    return Rect;
	})();
	module.exports = Misc;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GameData = (function () {
	    function GameData(playable) {
	        this.playable = playable;
	        this.processed = false;
	    }
	    return GameData;
	})();
	exports.GameData = GameData;
	var GameDataList = (function () {
	    function GameDataList() {
	        this.list = new Array();
	    }
	    Object.defineProperty(GameDataList.prototype, "length", {
	        get: function () {
	            return this.list.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GameDataList.prototype.add = function (playable) {
	        this.list.push(new GameData(playable));
	    };
	    GameDataList.prototype.at = function (index) {
	        return this.list[index];
	    };
	    GameDataList.prototype.Clear = function () {
	        for (var index = 0; index < this.list.length; index++) {
	            this.list[index].processed = false;
	        }
	        this.Save();
	    };
	    GameDataList.prototype.Load = function () {
	        var stateText = localStorage.getItem("GameDataList.processed");
	        var processedList = JSON.parse(stateText);
	        for (var index = 0; index < processedList.length; index++) {
	            this.list[index].processed = processedList[index];
	        }
	    };
	    GameDataList.prototype.Save = function () {
	        var processedList = this.list.map(function (value, index, array) {
	            return value.processed;
	        });
	        var stateText = JSON.stringify(processedList);
	        localStorage.setItem("GameDataList.processed", stateText);
	    };
	    return GameDataList;
	})();
	exports.GameDataList = GameDataList;
	var GameState = (function () {
	    function GameState() {
	        this.data = {};
	    }
	    GameState.prototype.Clear = function () {
	        this.data = {};
	        this.Save();
	    };
	    GameState.prototype.Load = function () {
	        var stateText = localStorage.getItem("gameState");
	        this.data = JSON.parse(stateText);
	    };
	    GameState.prototype.Save = function () {
	        var stateText = JSON.stringify(this.data);
	        localStorage.setItem("gameState", stateText);
	    };
	    return GameState;
	})();
	exports.GameState = GameState;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Misc = __webpack_require__(15);
	var QuestionData = (function () {
	    function QuestionData(level, type, text, url, whendone) {
	        this.level = level;
	        this.type = type;
	        this.text = text;
	        this.url = url;
	        if (whendone != undefined) {
	            if (whendone.when != undefined)
	                this.when = whendone.when.bind(this.level);
	            if (whendone.done != undefined)
	                this.done = whendone.done.bind(this.level);
	        }
	    }
	    return QuestionData;
	})();
	var QuestionType;
	(function (QuestionType) {
	    QuestionType[QuestionType["SHOW"] = 0] = "SHOW";
	    QuestionType[QuestionType["HEAD"] = 1] = "HEAD";
	    QuestionType[QuestionType["ASK"] = 2] = "ASK";
	    QuestionType[QuestionType["CHOICE"] = 3] = "CHOICE";
	    QuestionType[QuestionType["DEFAULTANSWER"] = 4] = "DEFAULTANSWER";
	    QuestionType[QuestionType["DELAY"] = 5] = "DELAY";
	})(QuestionType || (QuestionType = {}));
	var Question = (function () {
	    function Question(level) {
	        this.level = level;
	        this.data = new Array();
	        this.funWhen_curious_internal = function () {
	            return false;
	        };
	        this.funDone_curious_internal = function () {
	        };
	        return this;
	    }
	    Question.prototype.show = function (title, url, whendone) {
	        this.data.push(new QuestionData(this.level, 0 /* SHOW */, title, url, whendone));
	        return this;
	    };
	    Question.prototype.head = function (name, url) {
	        this.data.push(new QuestionData(this.level, 1 /* HEAD */, name, url));
	        return this;
	    };
	    Question.prototype.ask = function (line) {
	        this.data.push(new QuestionData(this.level, 2 /* ASK */, line));
	        return this;
	    };
	    Question.prototype.choice = function (line, done, when) {
	        this.data.push(new QuestionData(this.level, 3 /* CHOICE */, line, null, { done: done, when: when }));
	        return this;
	    };
	    Question.prototype.timeout = function (delay, defaultAnswer, whendone) {
	        this.data.push(new QuestionData(this.level, 5 /* DELAY */, delay.toString(), null, whendone));
	        this.data.push(new QuestionData(this.level, 4 /* DEFAULTANSWER */, defaultAnswer.toString()));
	        return this;
	    };
	    Question.prototype.value = function () {
	        return this;
	    };
	    Question.prototype.when = function (fun) {
	        this.funWhen_curious_internal = fun.bind(this.level);
	        return this;
	    };
	    Question.prototype.play_curious_internal = function (runner, completed) {
	        var question;
	        var choices = new Array();
	        var choicesMap = new Array();
	        var imap = 0;
	        var answers = [];
	        var timeout_ = 0;
	        var choice_ = 0;
	        for (var index = 0; index < this.data.length; index++) {
	            var currentData = this.data[index];
	            var ok = true;
	            if (currentData.when != undefined)
	                ok = currentData.when();
	            if (ok) {
	                if (currentData.type == 2 /* ASK */)
	                    question = currentData.text;
	                if (currentData.type == 3 /* CHOICE */) {
	                    choices.push(currentData.text);
	                    answers.push(currentData.done.bind(this.level));
	                    choicesMap.push(imap);
	                    imap++;
	                }
	                if (currentData.type == 4 /* DEFAULTANSWER */)
	                    choice_ = +currentData.text;
	                if (currentData.type == 5 /* DELAY */)
	                    timeout_ = +currentData.text;
	            }
	            else {
	                if (currentData.type == 3 /* CHOICE */) {
	                    choicesMap.push(-1);
	                }
	            }
	        }
	        var onanswer = function (choice) {
	            if (choice != -1) {
	                for (var i = 0; i < choicesMap.length; i++) {
	                    if (choicesMap[i] == choice) {
	                        choice = i;
	                        break;
	                    }
	                }
	                var funAnswer = answers[choice];
	                if (funAnswer != undefined) {
	                    funAnswer();
	                }
	            }
	            completed();
	        };
	        this.play_anim_actions(runner, function () {
	            runner.showQuestion(question, choices, timeout_, choicesMap[choice_], onanswer);
	        });
	    };
	    Question.prototype.play_anim_actions = function (runner, completed) {
	        var _this = this;
	        var index = 0;
	        var currentData;
	        var iterateAnim = function () {
	            while (index != _this.data.length) {
	                currentData = _this.data[index];
	                index++;
	                if (currentData.type == 0 /* SHOW */ || currentData.type == 1 /* HEAD */) {
	                    var ok = true;
	                    if (currentData.when != undefined)
	                        ok = currentData.when();
	                    if (ok) {
	                        return currentData;
	                    }
	                }
	            }
	            return null;
	        };
	        var onnext = function () {
	            if (currentData != undefined && currentData.done != undefined)
	                currentData.done();
	            var data = iterateAnim();
	            if (data == null) {
	                completed();
	                return;
	            }
	            runProper(runner, data, onnext);
	        };
	        var runProper = function (runner, data, nextEvent) {
	            if (data == null)
	                nextEvent();
	            if (data.type == 0 /* SHOW */) {
	                runner.showAnim(data.text, Misc.fixText(_this.level, _this.level.imgFolder + data.url), nextEvent);
	            }
	            else if (data.type == 1 /* HEAD */) {
	                runner.setHead(data.text, _this.level.imgFolder + data.url, nextEvent);
	            }
	        };
	        runProper(runner, iterateAnim(), onnext);
	    };
	    return Question;
	})();
	module.exports = Question;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\me\\dev\\Moonsun\\src\\moonsun\\ts\\public\\node_modules\\css-loader\\index.js!C:\\me\\dev\\Moonsun\\src\\moonsun\\ts\\public\\assets\\app.css", function() {
			var newContent = require("!!C:\\me\\dev\\Moonsun\\src\\moonsun\\ts\\public\\node_modules\\css-loader\\index.js!C:\\me\\dev\\Moonsun\\src\\moonsun\\ts\\public\\assets\\app.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(150)();
	exports.push([module.id, "body,\nhtml {\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: black;\n  color: white;\n}\n.preload * {\n  -webkit-transition: none !important;\n          transition: none !important;\n}\nimg {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n*:focus {\n  outline: none;\n}\n.game-wrapper {\n  position: absolute;\n  overflow: hidden;\n}\n.layer {\n  position: absolute;\n  overflow: hidden;\n  width: 960px;\n  height: 540px;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n}\n.game {\n  background-color: #111;\n  font-family: 'Open Sans', sans-serif;\n}\n.cinema {\n  position: absolute;\n  width: 960px;\n  height: 540px;\n  -webkit-transition: opacity 0.75s;\n          transition: opacity 0.75s;\n}\n.cinema.my-hide {\n  -webkit-transition: opacity 0.25s;\n          transition: opacity 0.25s;\n  opacity: 0;\n}\n.cinema-wait {\n  position: absolute;\n  top: 20px;\n  width: 960px;\n  text-align: center;\n  -webkit-transition: opacity 0.75s ease 1.5s;\n          transition: opacity 0.75s ease 1.5s;\n}\n.cinema-wait.my-hide {\n  -webkit-transition: opacity 0.15s;\n          transition: opacity 0.15s;\n  opacity: 0;\n}\n.cinema-wait div {\n  display: inline-block;\n  background-color: gray;\n  padding: 8px 16px;\n  font-family: 'Open Sans', sans-serif;\n  font-size: x-large;\n}\n.description {\n  position: absolute;\n  top: 0;\n  width: 960px;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n  -webkit-transition: opacity 0.25s;\n          transition: opacity 0.25s;\n}\n.description.my-hide {\n  -webkit-transition: opacity 0.15s;\n          transition: opacity 0.15s;\n  opacity: 0;\n}\n.description div.description-text-default {\n  display: inline-block;\n  margin: 23px 30px 0 30px;\n  border: 5px solid #808080;\n  padding: 10px 15px;\n  font-size: 30px;\n  background-color: rgba(255, 255, 255, 0.9);\n  color: black;\n}\n.pop {\n  position: absolute;\n  top: 200px;\n  width: 960px;\n  -webkit-transform: translateY(-50px);\n          transform: translateY(-50px);\n  -webkit-transition: all 3s;\n          transition: all 3s;\n  -webkit-animation: pop-fadeout 3s ease forwards;\n          animation: pop-fadeout 3s ease forwards;\n}\n.pop.my-hide {\n  opacity: 0;\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n  -webkit-transition: opacity 0s;\n          transition: opacity 0s;\n  -webkit-animation: 0s none;\n          animation: 0s none;\n}\n.pop div {\n  text-shadow: 2px 2px 4px #333333, -2px -2px 4px #333333, 2px -2px 4px #333333, -2px 2px 4px #333333, 0 2px 4px #333333, 2px 0 4px #333333, 0 -2px 4px #333333, -2px 0 4px #333333;\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  font-size: 54px;\n  color: rgba(255, 255, 247, 0.9);\n  text-align: center;\n}\n@-webkit-keyframes pop-fadeout {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes pop-fadeout {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.main {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  color: black;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n}\n.title {\n  width: 960px;\n  height: 32px;\n  text-align: right;\n  border-bottom: 10px solid #23b0ff;\n}\n.title div {\n  text-shadow: 2px 2px 4px #333333, -2px -2px 4px #333333, 2px -2px 4px #333333, -2px 2px 4px #333333, 0 2px 4px #333333, 2px 0 4px #333333, 0 -2px 4px #333333, -2px 0 4px #333333;\n  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;\n  font-size: 27px;\n  color: #eee;\n  padding-right: 8px;\n  -webkit-transition: opacity 2s ease 1.5s;\n          transition: opacity 2s ease 1.5s;\n}\n.title div.my-hide {\n  -webkit-transition: opacity 0.15s;\n          transition: opacity 0.15s;\n  opacity: 0;\n  display: block !important;\n}\n.detail {\n  position: relative;\n  background-color: rgba(255, 255, 255, 0.95);\n  width: 960px;\n  height: 0;\n  -webkit-transition: all 0.15s;\n          transition: all 0.15s;\n}\n.detail.ofTalk {\n  height: 200px;\n  -webkit-transition: all 0.25s;\n          transition: all 0.25s;\n}\n.detail.ofQuest {\n  -webkit-transition: all 0.25s;\n          transition: all 0.25s;\n}\n.head {\n  position: absolute;\n  width: 270px;\n  height: 270px;\n  background-repeat: no-repeat;\n  float: left;\n  background-position-x: 0;\n  -webkit-transition: all 0.4s;\n          transition: all 0.4s;\n}\n.head.my-hide {\n  background-position-x: -270px;\n  -webkit-transition: all 0.4s;\n          transition: all 0.4s;\n}\n.head div:first-child {\n  text-align: right;\n  margin: 3px 10px 0 0;\n}\n.head div:first-child div {\n  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;\n  font-size: 35px;\n  background-color: #000;\n  color: #eee;\n  border-radius: 12px;\n  padding: 0 10px;\n  display: inline-block;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n}\n.talk {\n  width: 690px;\n  height: 270px;\n  margin-left: 270px;\n}\n.talk div {\n  padding: 16px 90px 0 0;\n  font-size: 32px;\n  line-height: 28px;\n  -webkit-transition: opacity .75s;\n          transition: opacity .75s;\n}\n.talk div.my-hide {\n  opacity: 0;\n}\n.question {\n  width: 690px;\n  margin-left: 270px;\n  -webkit-transition: opacity .75s;\n          transition: opacity .75s;\n}\n.question.my-hide {\n  opacity: 0;\n}\n.question div:first-child {\n  padding: 16px 90px 0 0;\n  font-size: 32px;\n  line-height: 28px;\n}\n.question ul {\n  font-size: 32px;\n  list-style-type: none;\n  text-align: left;\n  cursor: pointer;\n  counter-reset: qno;\n  padding-left: 80px;\n}\n.question ul li {\n  margin-top: 16px;\n  margin-bottom: 32px;\n  border-bottom: 2px solid #808080;\n  counter-increment: qno;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.question ul li.my-hide {\n  display: block !important;\n  opacity: 0.5;\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n.question ul li.myQuestSelected {\n  -webkit-animation: blink 0.1s ease 4;\n          animation: blink 0.1s ease 4;\n}\n.question ul li.myQuestUnselected {\n  opacity: 0.2;\n  -webkit-transition: opacity ease 0.5s;\n          transition: opacity ease 0.5s;\n}\n.question ul li:nth-child(1) {\n  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;\n          transition: opacity 0.5s, transform 0.5s;\n}\n.question ul li:nth-child(2) {\n  -webkit-transition: opacity 0.5s 0.1s, -webkit-transform 0.5s 0.1s;\n          transition: opacity 0.5s 0.1s, transform 0.5s 0.1s;\n}\n.question ul li:nth-child(3) {\n  -webkit-transition: opacity 0.5s 0.2s, -webkit-transform 0.5s 0.2s;\n          transition: opacity 0.5s 0.2s, transform 0.5s 0.2s;\n}\n.question ul li:nth-child(4) {\n  -webkit-transition: opacity 0.5s 0.3s, -webkit-transform 0.5s 0.3s;\n          transition: opacity 0.5s 0.3s, transform 0.5s 0.3s;\n}\n.question ul li:nth-child(5) {\n  -webkit-transition: opacity 0.5s 0.4s, -webkit-transform 0.5s 0.4s;\n          transition: opacity 0.5s 0.4s, transform 0.5s 0.4s;\n}\n.progress {\n  position: absolute;\n  top: -105px;\n  left: 419px;\n  width: 122px;\n  height: 122px;\n  -webkit-transition: opacity 0.4s;\n          transition: opacity 0.4s;\n}\n.progress.my-hide {\n  opacity: 0;\n}\n@-webkit-keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes blink {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.game-events {\n  position: absolute;\n  width: 960px;\n  height: 540px;\n  top: 0;\n  left: 0;\n}\n.game-events.my-hide {\n  top: 540px;\n}\n.menu.my-hide {\n  -webkit-transition: all 0.25s;\n          transition: all 0.25s;\n}\n.menu-bg {\n  position: absolute;\n  width: 960px;\n  height: 540px;\n  background: black;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.25s;\n          transition: opacity 0.25s;\n}\n.menu-bg.my-hide {\n  opacity: 0;\n  -webkit-transition: opacity 0.25s;\n          transition: opacity 0.25s;\n}\n.menu-items {\n  font-family: 'Arial Black', Gadget, sans-serif;\n  font-size: 44px;\n  line-height: 40px;\n}\n.menu-circle {\n  padding: 50px;\n  border: solid 20px #23b0ff;\n  border-radius: 50%;\n  background-color: #000;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition: all 0.2s;\n          transition: all 0.2s;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n}\n.menu-circle.my-hide {\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: all 0.2s;\n          transition: all 0.2s;\n}\n.menu-item-restart {\n  position: absolute;\n  top: 30px;\n  left: 100px;\n  width: 175px;\n  height: 175px;\n  background-color: #092c40;\n  color: #ff6a00;\n  display: table;\n}\n.menu-item-restart > div {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  pointer-events: none;\n}\n.menu-item-play {\n  position: absolute;\n  top: 220px;\n  left: 600px;\n  width: 150px;\n  height: 150px;\n  background-color: #092c40;\n  color: #4cff00;\n  display: table;\n}\n.menu-item-play.selected {\n  -webkit-transition: opacity 0.5s, -webkit-transform 0.5s;\n          transition: opacity 0.5s, transform 0.5s;\n  -webkit-transform: scale(6) rotate(30deg);\n          transform: scale(6) rotate(30deg);\n  opacity: 0;\n}\n.menu-item-play > div {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  pointer-events: none;\n}\n.feedback {\n  position: absolute;\n  top: 1540px;\n  width: 20px;\n  height: 20px;\n  border: 5px solid #ff0000;\n  border-radius: 50%;\n}\n.svg {\n  position: absolute;\n  left: 880px;\n  width: 960px;\n  height: 50px;\n  -webkit-backface-visibility: hidden;\n  -webkit-transform: translateZ(0) scale(1, 1);\n}\n/*# sourceMappingURL=app.css.map */", ""]);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Payload = __webpack_require__(33);
	var dispatcher = __webpack_require__(34);
	var AppActionCreators = (function () {
	    function AppActionCreators() {
	    }
	    AppActionCreators.clicked = function () {
	        var action = {
	            type: Payload.ActionTypes.CLICK
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showAnim = function (text, url, nextEvent) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_ANIM,
	            data: {
	                text: text,
	                url: url,
	                nextEvent: nextEvent
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showDescription = function (text, nextEvent) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_DESCRIPTION,
	            data: {
	                text: text,
	                nextEvent: nextEvent
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.hideDescription = function () {
	        var action = {
	            type: Payload.ActionTypes.HIDE_DESCRIPTION
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showPop = function (text) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_POP,
	            data: {
	                text: text
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.hidePop = function () {
	        var action = {
	            type: Payload.ActionTypes.HIDE_POP
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.setHead = function (talker, url) {
	        var action = {
	            type: Payload.ActionTypes.SET_HEAD,
	            data: {
	                talker: talker,
	                url: url
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showLine = function (text, nextEvent) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_LINE,
	            data: {
	                text: text,
	                nextEvent: nextEvent
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.hideLine = function () {
	        var action = {
	            type: Payload.ActionTypes.HIDE_LINE
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showQuest = function (question, choices, timeoutMax, defaultChoice, answerEvent) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_QUEST,
	            data: {
	                question: question,
	                choices: choices,
	                timeoutMax: timeoutMax,
	                defaultChoice: defaultChoice,
	                answerEvent: answerEvent
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.selectQuest = function (index) {
	        var action = {
	            type: Payload.ActionTypes.SELECT_QUEST,
	            data: {
	                index: index
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.questAnimDone = function () {
	        var action = {
	            type: Payload.ActionTypes.QUEST_ANIM_DONE
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showFeedback = function (clientX, clientY) {
	        var action = {
	            type: Payload.ActionTypes.SHOW_FEEDBACK,
	            data: {
	                clientX: clientX,
	                clientY: clientY
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.hideFeedback = function () {
	        var action = {
	            type: Payload.ActionTypes.HIDE_FEEDBACK
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.showMenu = function () {
	        var action = {
	            type: Payload.ActionTypes.SHOW_MENU
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.selectMenu = function (item, index) {
	        var action = {
	            type: Payload.ActionTypes.SELECT_MENU,
	            data: {
	                action: item,
	                index: index
	            }
	        };
	        dispatcher.handleViewAction(action);
	    };
	    AppActionCreators.menuAnimDone = function () {
	        var action = {
	            type: Payload.ActionTypes.MENU_ANIM_DONE
	        };
	        dispatcher.handleViewAction(action);
	    };
	    return AppActionCreators;
	})();
	module.exports = AppActionCreators;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this._onLoad = function () {
	            _this.setState({
	                hideCinema: false,
	                hideWait: true
	            });
	        };
	    }
	    Spec.prototype.getInitialState = function () {
	        return {
	            hideCinema: true,
	            hideWait: true,
	            url: null
	        };
	    };
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var cxCinema = React.addons.classSet({
	            "cinema": true,
	            "my-hide": this.state.hideCinema
	        });
	        var cxWait = React.addons.classSet({
	            "cinema-wait": true,
	            "my-hide": this.state.hideWait
	        });
	        return React.createElement("div", null, React.createElement("div", { className: cxCinema }, React.createElement("img", { width: "960", height: "540", src: this.state.url, onLoad: this._onLoad })), React.createElement("div", { className: cxWait }, React.createElement("div", null, this.props.store.wait)));
	    };
	    Spec.prototype._onChange = function () {
	        var _this = this;
	        this.setState({
	            hideCinema: true,
	            hideWait: false
	        });
	        setTimeout(function () {
	            _this.setState({ url: _this.props.store.url });
	        }, 250);
	    };
	    return Spec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(Spec);
	module.exports = component;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	;
	var TitleSpec = (function (_super) {
	    __extends(TitleSpec, _super);
	    function TitleSpec() {
	        _super.apply(this, arguments);
	    }
	    TitleSpec.prototype.getInitialState = function () {
	        return {
	            hide: false,
	            text: null
	        };
	    };
	    TitleSpec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    TitleSpec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    TitleSpec.prototype.render = function () {
	        return React.createElement("div", { className: "title" }, React.createElement("div", { className: (this.state.hide ? "my-hide" : "") }, this.state.text));
	    };
	    TitleSpec.prototype._onChange = function () {
	        var _this = this;
	        this.setState({
	            hide: true
	        });
	        setTimeout(function () {
	            _this.setState({ hide: false, text: _this.props.store.text });
	        }, 250);
	    };
	    return TitleSpec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(TitleSpec);
	module.exports = component;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var cx = React.addons.classSet({
	            "description": true,
	            "my-hide": this.props.store.hide
	        });
	        return React.createElement("div", { className: cx }, React.createElement("div", { className: "description-text-default" }, this.props.store.text));
	    };
	    Spec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return Spec;
	})(TypedReact.Component);
	var description = TypedReact.createClass(Spec);
	module.exports = description;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var cx = React.addons.classSet({
	            "pop": true,
	            "my-hide": this.props.store.hide
	        });
	        return React.createElement("div", { className: cx }, React.createElement("div", {
	            dangerouslySetInnerHTML: { __html: this.props.store.text }
	        }));
	    };
	    Spec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return Spec;
	})(TypedReact.Component);
	var description = TypedReact.createClass(Spec);
	module.exports = description;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.componentDidMount = function () {
	        this.props.talk.addChangeListener(this._onChange);
	        this.props.quest.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.talk.removeAllListeners();
	        this.props.quest.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var cx = React.addons.classSet({
	            "detail": true,
	            "ofTalk": (this.props.talk.hide == false),
	            "ofQuest": (this.props.quest.hide == false)
	        });
	        return React.createElement("div", { className: cx }, this.props.children);
	    };
	    Spec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return Spec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(Spec);
	module.exports = component;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	;
	var img = new Image();
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.getInitialState = function () {
	        return {
	            hide: true,
	            url: null
	        };
	    };
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var divStyle = {
	            backgroundImage: 'url(' + this.props.store.url + ')'
	        };
	        var cx = React.addons.classSet({
	            "head": true,
	            "my-hide": this.state.hide
	        });
	        return React.createElement("div", { className: cx, style: divStyle }, React.createElement("div", null, React.createElement("div", null, this.props.store.talker)));
	    };
	    Spec.prototype._onChange = function () {
	        var _this = this;
	        if (this.state.url !== this.props.store.url) {
	            this.setState({
	                hide: true
	            });
	            img.onload = function (ev) {
	                _this.setState({
	                    hide: false,
	                    url: _this.props.store.url
	                });
	            };
	            img.src = this.props.store.url;
	        }
	    };
	    return Spec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(Spec);
	module.exports = component;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var divStyle = {
	            display: (this.props.store.collapse ? "none" : "")
	        };
	        var cx = React.addons.classSet({
	            "talk": true,
	            "my-hide": this.props.store.hide
	        });
	        return React.createElement("div", { className: cx, style: divStyle }, React.createElement("div", {
	            className: (this.props.store.hide ? "my-hide" : ""),
	            dangerouslySetInnerHTML: { __html: this.props.store.text }
	        }));
	    };
	    Spec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return Spec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(Spec);
	module.exports = component;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	var ActionCreators = __webpack_require__(21);
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
	        if (this.props.hideClock || this.props.timeoutMax == 0)
	            return;
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
	        if (this.props.store.hide == false) {
	            this.setState({ hideChoice: true });
	            this.setState({ hideChoice: false });
	        }
	        else {
	            this.forceUpdate();
	            setTimeout(ActionCreators.questAnimDone, 750);
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


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	var ActionCreators = __webpack_require__(21);
	;
	var ClickerSpec = (function (_super) {
	    __extends(ClickerSpec, _super);
	    function ClickerSpec() {
	        _super.apply(this, arguments);
	        this._handleOnClick = function () {
	            ActionCreators.clicked();
	        };
	    }
	    ClickerSpec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    ClickerSpec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    ClickerSpec.prototype.render = function () {
	        var cx = React.addons.classSet({
	            "game-events": true,
	            "my-hide": this.props.store.hideClicker
	        });
	        return React.createElement("div", { className: cx, onClick: this._handleOnClick, onTouchEnd: this._handleOnClick });
	    };
	    ClickerSpec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return ClickerSpec;
	})(TypedReact.Component);
	var component = TypedReact.createClass(ClickerSpec);
	module.exports = component;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	var ActionCreators = __webpack_require__(21);
	var game = __webpack_require__(43);
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.componentDidUpdate = function () {
	        if (this.props.store.showFeedback) {
	            var fb = this.getDOMNode();
	            var top = ((this.props.store.feedbackY - game.DISPLAY_TOP) / game.DISPLAY_SCALE) - 10;
	            var left = ((this.props.store.feedbackX - game.DISPLAY_LEFT) / game.DISPLAY_SCALE) - 10;
	            fb.style.top = top.toString() + "px";
	            fb.style.left = left.toString() + "px";
	            var onfbFadeout = function (event) {
	                fb.removeEventListener(game.EVT_TRANSITION_END, onfbFadeout);
	                fb.removeAttribute("style");
	                ActionCreators.hideFeedback();
	            };
	            fb.style[game.TRANSITION] = "opacity 0.4s, " + game.STRANSFORM + " 0.4s";
	            fb.style.opacity = "0";
	            fb.style[game.TRANSFORM] = "scale(5)";
	            fb.addEventListener(game.EVT_TRANSITION_END, onfbFadeout);
	        }
	    };
	    Spec.prototype.render = function () {
	        var cx = React.addons.classSet({
	            "feedback": true,
	            "my-hide": !this.props.store.showFeedback
	        });
	        return React.createElement("div", { className: cx });
	    };
	    Spec.prototype._onChange = function () {
	        this.forceUpdate();
	    };
	    return Spec;
	})(TypedReact.Component);
	var description = TypedReact.createClass(Spec);
	module.exports = description;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(3);
	var TypedReact = __webpack_require__(5);
	var ActionCreators = __webpack_require__(21);
	var rce = React.createElement;
	var DivSpec = (function (_super) {
	    __extends(DivSpec, _super);
	    function DivSpec() {
	        _super.apply(this, arguments);
	    }
	    DivSpec.prototype.render = function () {
	        return rce("div", {
	            className: this.props.className,
	            onClick: this._onClick,
	            onTouchEnd: this._onTouchEnd
	        }, rce("div", { dangerouslySetInnerHTML: { __html: this.props.name } }));
	    };
	    DivSpec.prototype._onClick = function (ev) {
	        this.props.onClick(this.props.actionKey, this.props.actionIndex, ev.clientX, ev.clientY);
	    };
	    DivSpec.prototype._onTouchEnd = function (ev) {
	        if (ev.targetTouches.length > 0) {
	            var touch = ev.targetTouches[0];
	            this.props.onClick(this.props.actionKey, this.props.actionIndex, touch.clientX, touch.clientY);
	        }
	    };
	    return DivSpec;
	})(TypedReact.Component);
	var liComponent = TypedReact.createClass(DivSpec);
	;
	;
	var Spec = (function (_super) {
	    __extends(Spec, _super);
	    function Spec() {
	        _super.apply(this, arguments);
	    }
	    Spec.prototype.getInitialState = function () {
	        return {
	            hideBackground: true
	        };
	    };
	    Spec.prototype.componentDidMount = function () {
	        this.props.store.addChangeListener(this._onChange);
	    };
	    Spec.prototype.componentWillUnmount = function () {
	        this.props.store.removeAllListeners();
	    };
	    Spec.prototype.render = function () {
	        var _this = this;
	        var cx = React.addons.classSet({
	            "menu": true,
	            "my-hide": this.props.store.hide
	        });
	        var cx2 = React.addons.classSet({
	            "menu-bg": true,
	            "my-hide": this.props.store.hide
	        });
	        var lise = this.props.store.list.map(function (action, index) {
	            var className = "menu-circle menu-item-" + action.key;
	            if (action.selected)
	                className += " selected";
	            if (_this.props.store.hide && !action.selected)
	                className += " my-hide";
	            return rce(liComponent, {
	                className: className,
	                key: index,
	                actionKey: action.key,
	                actionIndex: index,
	                name: action.name,
	                onClick: _this._onClick
	            });
	        });
	        return rce("div", { className: cx }, rce("div", { className: cx2, style: { display: (this.state.hideBackground ? "none" : "") } }), rce("div", { className: "menu-items" }, lise));
	    };
	    Spec.prototype._onChange = function () {
	        var _this = this;
	        if (this.props.store.hide) {
	            setTimeout(function () {
	                _this.setState({ hideBackground: true });
	            }, 250);
	            this.forceUpdate();
	        }
	        else {
	            this.setState({ hideBackground: false });
	        }
	    };
	    Spec.prototype._onClick = function (key, keyIndex, clientX, clientY) {
	        ActionCreators.selectMenu(key, keyIndex);
	        ActionCreators.showFeedback(clientX, clientY);
	    };
	    return Spec;
	})(TypedReact.Component);
	var description = TypedReact.createClass(Spec);
	module.exports = description;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var PayloadSources = (function () {
	    function PayloadSources() {
	    }
	    PayloadSources.VIEW_ACTION = "VIEW_ACTION";
	    PayloadSources.SERVER_ACTION = "SERVER_ACTION";
	    return PayloadSources;
	})();
	exports.PayloadSources = PayloadSources;
	var ActionTypes = (function () {
	    function ActionTypes() {
	    }
	    ActionTypes.CLICK = "CLICK";
	    ActionTypes.CHANGE_CINEMA = "CHANGE_CINEMA";
	    ActionTypes.SHOW_ANIM = "SHOW_ANIM";
	    ActionTypes.SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
	    ActionTypes.HIDE_DESCRIPTION = "HIDE_DESCRIPTION";
	    ActionTypes.SHOW_POP = "SHOW_POP";
	    ActionTypes.HIDE_POP = "HIDE_POP";
	    ActionTypes.SET_HEAD = "SET_HEAD";
	    ActionTypes.SHOW_LINE = "SHOW_LINE";
	    ActionTypes.HIDE_LINE = "HIDE_LINE";
	    ActionTypes.SHOW_QUEST = "SHOW_QUEST";
	    ActionTypes.SELECT_QUEST = "SELECT_QUEST";
	    ActionTypes.QUEST_ANIM_DONE = "QUEST_ANIM_DONE";
	    ActionTypes.SHOW_FEEDBACK = "SHOW_FEEDBACK";
	    ActionTypes.HIDE_FEEDBACK = "HIDE_FEEDBACK";
	    ActionTypes.SHOW_MENU = "SHOW_MENU";
	    ActionTypes.SELECT_MENU = "SELECT_MENU";
	    ActionTypes.MENU_ANIM_DONE = "MENU_ANIM_DONE";
	    return ActionTypes;
	})();
	exports.ActionTypes = ActionTypes;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Flux = __webpack_require__(2);
	var Payload = __webpack_require__(33);
	var appDispatcher = (function (_super) {
	    __extends(appDispatcher, _super);
	    function appDispatcher() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.handleServerAction = function (action) {
	            var payload = {
	                source: Payload.PayloadSources.SERVER_ACTION,
	                action: action
	            };
	            _this.dispatch(payload);
	        };
	        this.handleViewAction = function (action) {
	            var payload = {
	                source: Payload.PayloadSources.VIEW_ACTION,
	                action: action
	            };
	            _this.dispatch(payload);
	        };
	    }
	    return appDispatcher;
	})(Flux.Dispatcher);
	var dispatcher = new appDispatcher();
	module.exports = dispatcher;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var CinemaStore = (function (_super) {
	    __extends(CinemaStore, _super);
	    function CinemaStore() {
	        var _this = this;
	        _super.call(this);
	        this.text = "";
	        this.url = "pleeeeeze wait!";
	        this.wait = "";
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            switch (action.type) {
	                case ActionTypes.SHOW_ANIM:
	                    var data = action.data;
	                    _this.text = data.text;
	                    _this.url = data.url;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return CinemaStore;
	})(BaseStore);
	module.exports = CinemaStore;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.text = "";
	        this.hide = true;
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            switch (action.type) {
	                case ActionTypes.SHOW_DESCRIPTION:
	                    var data = action.data;
	                    _this.text = data.text;
	                    _this.hide = false;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.HIDE_DESCRIPTION:
	                    _this.hide = true;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.talker = "";
	        this.url = "";
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            switch (action.type) {
	                case ActionTypes.SET_HEAD:
	                    var data = action.data;
	                    _this.talker = data.talker;
	                    _this.url = data.url;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.text = "";
	        this.hide = true;
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            var data = action.data;
	            switch (action.type) {
	                case ActionTypes.SHOW_POP:
	                    _this.text = data.text;
	                    _this.hide = false;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.HIDE_POP:
	                    _this.hide = true;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.text = "";
	        this.hide = true;
	        this.collapse = true;
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            switch (action.type) {
	                case ActionTypes.SHOW_LINE:
	                    var data = action.data;
	                    _this.text = data.text;
	                    _this.hide = false;
	                    _this.collapse = false;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.HIDE_LINE:
	                    _this.hide = true;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.SHOW_QUEST:
	                    _this.collapse = true;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionTypes = Payload.ActionTypes;
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.question = "";
	        this.choices = new Array();
	        this.timeoutMax = 0;
	        this.defaultChoice = -1;
	        this.hide = true;
	        this.hideClock = true;
	        this.indexSelected = -1;
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            var data = action.data;
	            switch (action.type) {
	                case ActionTypes.SHOW_QUEST:
	                    _this.question = data.question;
	                    _this.choices = data.choices;
	                    _this.timeoutMax = data.timeoutMax;
	                    _this.defaultChoice = data.defaultChoice;
	                    _this.hideClock = (_this.timeoutMax == 0);
	                    _this.indexSelected = -1;
	                    _this.hide = false;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.SELECT_QUEST:
	                    _this.hide = true;
	                    _this.hideClock = true;
	                    _this.indexSelected = data.index;
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var dispatcher = __webpack_require__(34);
	var Payload = __webpack_require__(33);
	var BaseStore = __webpack_require__(42);
	var ActionCreators = __webpack_require__(21);
	var ActionTypes = Payload.ActionTypes;
	var MenuItem = (function () {
	    function MenuItem(key, name) {
	        this.key = key;
	        this.name = name;
	        this.selected = false;
	    }
	    return MenuItem;
	})();
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store() {
	        var _this = this;
	        _super.call(this);
	        this.hide = true;
	        this.list = null;
	        this.list = [
	            new MenuItem("restart", "Nouvelle<br/>partie"),
	            new MenuItem("play", "Retour<br/>au jeu")
	        ];
	        this.dispatchToken = dispatcher.register(function (payload) {
	            var action = payload.action;
	            var data = action.data;
	            switch (action.type) {
	                case ActionTypes.SHOW_MENU:
	                    _this.hide = !_this.hide;
	                    _this.emitChange();
	                    break;
	                case ActionTypes.SELECT_MENU:
	                    _this.hide = true;
	                    _this.list[data.index].selected = true;
	                    _this.emitChange();
	                    if (data.action == "restart") {
	                        setTimeout(function () {
	                            window.location.reload();
	                        }, 1000);
	                    }
	                    else {
	                        setTimeout(ActionCreators.menuAnimDone, 550);
	                    }
	                    break;
	                case ActionTypes.MENU_ANIM_DONE:
	                    for (var i = 0; i < _this.list.length; i++) {
	                        _this.list[i].selected = false;
	                    }
	                    _this.emitChange();
	                    break;
	            }
	            ;
	        });
	    }
	    return Store;
	})(BaseStore);
	module.exports = Store;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var EventEmitter = __webpack_require__(80);
	var CHANGE_EVENT = "change";
	var BaseStore = (function (_super) {
	    __extends(BaseStore, _super);
	    function BaseStore() {
	        _super.apply(this, arguments);
	        this.emitChange = function () {
	            this.emit(CHANGE_EVENT);
	        };
	        this.addChangeListener = function (callback) {
	            this.on(CHANGE_EVENT, callback);
	        };
	    }
	    return BaseStore;
	})(EventEmitter);
	module.exports = BaseStore;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function indexOfListener(listeners, listener) {
	    var i = listeners.length;
	    while (i--) {
	        if (listeners[i].listener === listener) {
	            return i;
	        }
	    }
	    return -1;
	}
	function alias(name) {
	    return function aliasClosure() {
	        return this[name].apply(this, arguments);
	    };
	}
	var EventEmitter = (function () {
	    function EventEmitter() {
	        this.getListeners = function getListeners(evt) {
	            var events = this._getEvents();
	            var response;
	            var key;
	            if (evt instanceof RegExp) {
	                response = {};
	                for (key in events) {
	                    if (events.hasOwnProperty(key) && evt.test(key)) {
	                        response[key] = events[key];
	                    }
	                }
	            }
	            else {
	                response = events[evt] || (events[evt] = []);
	            }
	            return response;
	        };
	        this.flattenListeners = function flattenListeners(listeners) {
	            var flatListeners = [];
	            var i;
	            for (i = 0; i < listeners.length; i += 1) {
	                flatListeners.push(listeners[i].listener);
	            }
	            return flatListeners;
	        };
	        this.getListenersAsObject = function getListenersAsObject(evt) {
	            var listeners = this.getListeners(evt);
	            var response;
	            if (listeners instanceof Array) {
	                response = {};
	                response[evt] = listeners;
	            }
	            return response || listeners;
	        };
	        this.addListener = function addListener(evt, listener) {
	            var listeners = this.getListenersAsObject(evt);
	            var listenerIsWrapped = typeof listener === 'object';
	            var key;
	            for (key in listeners) {
	                if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                    listeners[key].push(listenerIsWrapped ? listener : {
	                        listener: listener,
	                        once: false
	                    });
	                }
	            }
	            return this;
	        };
	        this.on = alias('addListener');
	        this.addOnceListener = function addOnceListener(evt, listener) {
	            return this.addListener(evt, {
	                listener: listener,
	                once: true
	            });
	        };
	        this.once = alias('addOnceListener');
	        this.defineEvent = function defineEvent(evt) {
	            this.getListeners(evt);
	            return this;
	        };
	        this.defineEvents = function defineEvents(evts) {
	            for (var i = 0; i < evts.length; i += 1) {
	                this.defineEvent(evts[i]);
	            }
	            return this;
	        };
	        this.removeListener = function removeListener(evt, listener) {
	            var listeners = this.getListenersAsObject(evt);
	            var index;
	            var key;
	            for (key in listeners) {
	                if (listeners.hasOwnProperty(key)) {
	                    index = indexOfListener(listeners[key], listener);
	                    if (index !== -1) {
	                        listeners[key].splice(index, 1);
	                    }
	                }
	            }
	            return this;
	        };
	        this.off = alias('removeListener');
	        this.addListeners = function addListeners(evt, listeners) {
	            return this.manipulateListeners(false, evt, listeners);
	        };
	        this.removeListeners = function removeListeners(evt, listeners) {
	            return this.manipulateListeners(true, evt, listeners);
	        };
	        this.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	            var i;
	            var value;
	            var single = remove ? this.removeListener : this.addListener;
	            var multiple = remove ? this.removeListeners : this.addListeners;
	            if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	                for (i in evt) {
	                    if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                        if (typeof value === 'function') {
	                            single.call(this, i, value);
	                        }
	                        else {
	                            multiple.call(this, i, value);
	                        }
	                    }
	                }
	            }
	            else {
	                i = listeners.length;
	                while (i--) {
	                    single.call(this, evt, listeners[i]);
	                }
	            }
	            return this;
	        };
	        this.removeEvent = function removeEvent(evt) {
	            var type = typeof evt;
	            var events = this._getEvents();
	            var key;
	            if (type === 'string') {
	                delete events[evt];
	            }
	            else if (evt instanceof RegExp) {
	                for (key in events) {
	                    if (events.hasOwnProperty(key) && evt.test(key)) {
	                        delete events[key];
	                    }
	                }
	            }
	            else {
	                delete this._events;
	            }
	            return this;
	        };
	        this.removeAllListeners = alias('removeEvent');
	        this.emitEvent = function emitEvent(evt, args) {
	            var listeners = this.getListenersAsObject(evt);
	            var listener;
	            var i;
	            var key;
	            var response;
	            for (key in listeners) {
	                if (listeners.hasOwnProperty(key)) {
	                    i = listeners[key].length;
	                    while (i--) {
	                        listener = listeners[key][i];
	                        if (listener.once === true) {
	                            this.removeListener(evt, listener.listener);
	                        }
	                        response = listener.listener.apply(this, args || []);
	                        if (response === this._getOnceReturnValue()) {
	                            this.removeListener(evt, listener.listener);
	                        }
	                    }
	                }
	            }
	            return this;
	        };
	        this.trigger = alias('emitEvent');
	        this.emit = function emit(evt) {
	            var args = Array.prototype.slice.call(arguments, 1);
	            return this.emitEvent(evt, args);
	        };
	        this.setOnceReturnValue = function setOnceReturnValue(value) {
	            this._onceReturnValue = value;
	            return this;
	        };
	        this._getOnceReturnValue = function _getOnceReturnValue() {
	            if (this.hasOwnProperty('_onceReturnValue')) {
	                return this._onceReturnValue;
	            }
	            else {
	                return true;
	            }
	        };
	        this._getEvents = function _getEvents() {
	            return this._events || (this._events = {});
	        };
	    }
	    return EventEmitter;
	})();
	module.exports = EventEmitter;


/***/ },
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
]);