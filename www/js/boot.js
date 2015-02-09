console.log("trying to use engine");
var Engine = require("engine");

$(document).ready(function() {
  // are we running in native app or in a browser?
  window.isphone = !!window.cordova;
  if( window.isphone ) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady();
  }
});

var screenCanvas = null;
var screenCanvasCtx = null;

function onDeviceReady() {
  console.log("onDeviceReady()");

  $('html,body').scrollTop(0);
  $('body').on('touchmove', function(evt) {
      evt.preventDefault();
  })

  $('#screenCanvas').on('touchend click', function(evt) {
   evt.preventDefault();

   console.log("click at " + evt.offsetX + ", " + evt.offsetY, evt);
  });

  screenCanvas = document.querySelector('#screenCanvas');
  function resize() {
    // Our canvas must cover full height of screen
    // regardless of the resolution
    var width = window.innerWidth;
    var height = window.innerHeight;
    var windowRatio = window.innerWidth / window.innerHeight;
    var canvasRatio = screenCanvas.width / screenCanvas.height;

    if(windowRatio < canvasRatio) {
      height = width / canvasRatio;
    } else {
      width = height * canvasRatio;
    }

    screenCanvas.style.width = width+'px';
    screenCanvas.style.height = height+'px';
    screenCanvasCtx = screenCanvas.getContext('2d');
    console.log("width "+width+" height: "+height);
  }

  window.onresize = resize;
  resize();
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  screenCanvasCtx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
  screenCanvasCtx.moveTo(0, 0);
  screenCanvasCtx.lineTo(960, 540);
  screenCanvasCtx.lineWidth = 7;
  screenCanvasCtx.strokeStyle = 'white';
  screenCanvasCtx.stroke();
}
