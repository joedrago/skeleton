Engine = require "engine"

$(document).ready ->
  # are we running in native app or in a browser?
  window.isphone = !!window.cordova
  if window.isphone
    document.addEventListener("deviceready", onDeviceReady, false)
  else
    onDeviceReady()

onDeviceReady = ->
  console.log "onDeviceReady"

  window.engine = new Engine document.querySelector('#screenCanvas')
  window.pointerId = null
  window.scale = 1

  $('html,body').scrollTop(0)
#  $('body').on 'touchmove', (evt) ->
#    evt.preventDefault()

  $('#screenCanvas').on 'pointerdown', (evt) ->
    evt.preventDefault()
    return if window.pointerId != null
    window.pointerId = evt.pointerId
    window.engine.mouseDown Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale)

  $('#screenCanvas').on 'pointermove', (evt) ->
    evt.preventDefault()
    return if window.pointerId != evt.pointerId
    window.engine.mouseMove Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale)

  $('#screenCanvas').on 'pointerup', (evt) ->
    evt.preventDefault()
    return if window.pointerId != evt.pointerId
    window.pointerId = null
    window.engine.mouseUp Math.floor(evt.clientX / window.scale), Math.floor(evt.clientY / window.scale)

  resize = ->
    window.scale = window.engine.resize()

  window.onresize = resize
  resize()

  engineLoop()

engineLoop = ->
  requestAnimationFrame(engineLoop)
  window.engine.loop()
