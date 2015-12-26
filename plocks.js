(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var PlockConfig = (function () {
    function PlockConfig(conf) {
        if (conf === void 0) { conf = {}; }
        this.fixsize = !!conf.fix;
        this.size = parseInt(conf.size) || 200;
    }
    PlockConfig.prototype.isFixedPlockSize = function () { return this.fixsize; };
    PlockConfig.prototype.getPlockSize = function () { return this.size; };
    return PlockConfig;
})();
exports.PlockConfig = PlockConfig;

},{}],2:[function(require,module,exports){
var p = require('./plocks');
Plocks = p.Plocks;
},{"./plocks":4}],3:[function(require,module,exports){
var Plock = (function () {
    function Plock() {
    }
    Plock.create = function () {
        return new Plock();
    };
    return Plock;
})();
exports.Plock = Plock;

},{}],4:[function(require,module,exports){
var pc = require('./config');
var Plocks = (function () {
    function Plocks(areaId, conf) {
        if (conf === void 0) { conf = {}; }
        this.area = document.getElementById(areaId);
        this.setConfig(conf);
    }
    Plocks.create = function (areaId, conf) {
        if (conf === void 0) { conf = {}; }
        return new Plocks(areaId, conf);
    };
    Plocks.prototype.setConfig = function (conf) {
        this.config = new pc.PlockConfig(conf);
    };
    return Plocks;
})();
exports.Plocks = Plocks;

},{"./config":1}]},{},[2,4,1,3]);
