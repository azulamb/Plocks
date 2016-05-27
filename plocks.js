(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
;
var PlockAPI = (function () {
    // list
    // param: page, num, order, category
    function PlockAPI(conf) {
        this.server = conf.server || './';
        this.list = conf.list || 'list';
    }
    PlockAPI.prototype.create = function () {
        try {
            return new XMLHttpRequest();
        }
        catch (e) { }
        return null;
    };
    PlockAPI.prototype.createGetParams = function (params) {
        var p = [];
        for (var v in params) {
            p.push(v + '=' + encodeURIComponent(params[v]));
        }
        return 0 < p.length ? ('?' + p.join('&')) : '';
    };
    PlockAPI.prototype.fetch = function (api, params, success, error) {
        var req = this.create();
        if (!req) {
            error({});
            return null;
        }
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 0) {
                    return error({});
                }
                if (!(200 <= req.status && req.status < 300) || (req.status === 304)) {
                    return error({});
                }
                success(JSON.parse(req.responseText));
            }
        };
        req.open('GET', this.server + api + this.createGetParams(params), true);
        req.send(null);
        return req;
    };
    PlockAPI.prototype.getList = function (params, success, error) {
        this.fetch(this.list, params, success, error);
    };
    return PlockAPI;
}());
exports.PlockAPI = PlockAPI;
;

},{}],2:[function(require,module,exports){
"use strict";
var ps = require('./style');
var api = require('./api');
var PlockConfig = (function () {
    function PlockConfig(areaId, conf) {
        if (conf === void 0) { conf = {}; }
        this.area = document.getElementById(areaId);
        this.addOverlay();
        this.addPlockListArea();
        this.fixsize = !!conf.fix;
        this.size = parseInt(conf.size) || 200;
        // Style
        this.style = new ps.PlockStyle(this, document.styleSheets[0]);
        // Server
        this.server = new api.PlockAPI(conf);
    }
    PlockConfig.prototype.isFixedPlockSize = function () { return this.fixsize; };
    PlockConfig.prototype.getPlockSize = function () { return this.size; };
    PlockConfig.prototype.getPlocksArea = function () { return this.area; };
    PlockConfig.prototype.getOverray = function () { return this.overlay; };
    PlockConfig.prototype.getPlockList = function () { return this.plist; };
    PlockConfig.prototype.getServer = function () { return this.server; };
    PlockConfig.prototype.addOverlay = function () {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('PlockOvelay');
        this.area.appendChild(this.overlay);
    };
    PlockConfig.prototype.addPlockListArea = function () {
        this.plist = document.createElement('ul');
        this.plist.classList.add('PlockStyleList');
        this.area.appendChild(this.plist);
    };
    return PlockConfig;
}());
exports.PlockConfig = PlockConfig;

},{"./api":1,"./style":6}],3:[function(require,module,exports){
var p = require('./plocks');
Plocks = p.Plocks;
},{"./plocks":5}],4:[function(require,module,exports){
"use strict";
var Plock = (function () {
    function Plock(content, style) {
        if (content === void 0) { content = null; }
        if (style === void 0) { style = undefined; }
    }
    Plock.create = function (content, style) {
        if (content === void 0) { content = null; }
        if (style === void 0) { style = undefined; }
        return new Plock(content, style);
    };
    Plock.prototype.render = function () {
        var item = document.createElement('li');
        item.classList.add('PlockStyle');
        return item;
    };
    return Plock;
}());
exports.Plock = Plock;

},{}],5:[function(require,module,exports){
"use strict";
var p = require('./plock');
var pc = require('./config');
var Plocks = (function () {
    function Plocks(areaId, mdparser, conf) {
        var _this = this;
        if (conf === void 0) { conf = {}; }
        this.config = new pc.PlockConfig(areaId, conf);
        this.list = new Array();
        this.config.getServer().getList({ page: 0 }, function () { _this.render(); }, function () { });
    }
    Plocks.create = function (areaId, conf) {
        if (conf === void 0) { conf = {}; }
        return new Plocks(areaId, conf);
    };
    Plocks.prototype.push = function (content) {
        this.list.push(p.Plock.create(content));
    };
    Plocks.prototype.render = function () {
        var area = this.config.getPlockList();
        for (var i = 0; i < this.list.length; ++i) {
            area.appendChild(this.list[i].render());
        }
    };
    return Plocks;
}());
exports.Plocks = Plocks;

},{"./config":2,"./plock":4}],6:[function(require,module,exports){
"use strict";
var PlockStyle = (function () {
    function PlockStyle(config, ss) {
        this.config = config;
        this.setAreaStyle();
        // Setting Plock style.
        var a = document.getElementsByClassName('PlockStyle');
        this.pstyle = undefined;
        // Setting first style.
        //this.pstyle.width = config.getPlockSize() + 'px';
        //this.pstyle.height = config.getPlockSize() + 'px';
    }
    PlockStyle.prototype.searchPlockStyle = function () {
        for (var s = 0; s < document.styleSheets.length; ++s) {
            var r = (document.styleSheets[s]).rules;
            if (!r) {
                continue;
            }
            for (var i = 0; i < r.length; ++i) {
                if (r[i].selectorText === '.PlockStyle') {
                    this.pstyle = r[i].style;
                }
            }
        }
    };
    PlockStyle.prototype.setAreaStyle = function () {
        var style = this.config.getPlocksArea().style;
        style.position = 'relative';
    };
    return PlockStyle;
}());
exports.PlockStyle = PlockStyle;

},{}]},{},[3]);
