require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"boot":[function(require,module,exports){
var Engine, engineLoop, onDeviceReady;

Engine = require("engine");

$(document).ready(function() {
  window.isphone = !!window.cordova;
  if (window.isphone) {
    return document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    return onDeviceReady();
  }
});

onDeviceReady = function() {
  var resize;
  console.log("onDeviceReady");
  window.engine = new Engine(document.querySelector('#screenCanvas'));
  window.pointerId = null;
  window.scale = 1;
  $('html,body').scrollTop(0);
  $('#screenCanvas').on('pointerdown', function(evt) {
    evt.preventDefault();
    if (window.pointerId !== null) {
      return;
    }
    window.pointerId = evt.pointerId;
    return window.engine.mouseDown(Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale));
  });
  $('#screenCanvas').on('pointermove', function(evt) {
    evt.preventDefault();
    if (window.pointerId !== evt.pointerId) {
      return;
    }
    return window.engine.mouseMove(Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale));
  });
  $('#screenCanvas').on('pointerup', function(evt) {
    evt.preventDefault();
    if (window.pointerId !== evt.pointerId) {
      return;
    }
    window.pointerId = null;
    return window.engine.mouseUp(Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale));
  });
  resize = function() {
    return window.scale = window.engine.resize();
  };
  window.onresize = resize;
  resize();
  return engineLoop();
};

engineLoop = function() {
  requestAnimationFrame(engineLoop);
  return window.engine.loop();
};



},{"engine":"engine"}],"engine":[function(require,module,exports){
var Game;

Game = (function() {
  function Game(_at_canvas) {
    this.canvas = _at_canvas;
    console.log("Game constructor");
    this.context = this.canvas.getContext('2d');
    this.end = {
      x: 1920,
      y: 1080
    };
  }

  Game.prototype.resize = function() {
    var canvasRatio, height, width, windowRatio;
    console.log("Game resize()");
    width = window.innerWidth;
    height = window.innerHeight;
    windowRatio = window.innerWidth / window.innerHeight;
    canvasRatio = this.canvas.width / this.canvas.height;
    if (windowRatio < canvasRatio) {
      height = width / canvasRatio;
    } else {
      width = height * canvasRatio;
    }
    this.scale = width / this.canvas.width;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.debugImage = new Image();
    this.debugImage.src = "images/debug.png";
    console.log("w/h " + width + "x" + height + " canvas: " + this.canvas.width + "x" + this.canvas.height + " scale: " + this.scale);
    return this.scale;
  };

  Game.prototype.mouseDown = function(x, y) {
    this.end.x = x;
    return this.end.y = y;
  };

  Game.prototype.mouseMove = function(x, y) {
    this.end.x = x;
    return this.end.y = y;
  };

  Game.prototype.mouseUp = function(x, y) {
    this.end.x = x;
    return this.end.y = y;
  };

  Game.prototype.update = function() {};

  Game.prototype.render = function() {
    var context;
    context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return context.drawImage(this.debugImage, this.end.x, this.end.y);
  };

  Game.prototype.loop = function() {
    this.update();
    return this.render();
  };

  return Game;

})();

module.exports = Game;



},{}]},{},[]);
