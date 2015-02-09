class Game
  constructor: (@canvas) ->
    console.log "Game constructor"
    @context = @canvas.getContext('2d')
    @end =
      x: 1920
      y: 1080

  resize: ->
    console.log "Game resize()"

    width = window.innerWidth
    height = window.innerHeight
    windowRatio = window.innerWidth / window.innerHeight
    canvasRatio = @canvas.width / @canvas.height
    if windowRatio < canvasRatio
      height = width / canvasRatio
    else
      width = height * canvasRatio

    @scale = width / @canvas.width

    @canvas.style.width = width+'px'
    @canvas.style.height = height+'px'

    @debugImage = new Image()
    @debugImage.src = "images/debug.png"

    console.log "w/h #{width}x#{height} canvas: #{@canvas.width}x#{@canvas.height} scale: #{@scale}"
    return @scale

  mouseDown: (x, y) ->
    # console.log "mouseDown #{x}, #{y}"
    @end.x = x
    @end.y = y

  mouseMove: (x, y) ->
    # console.log "mouseMove #{x}, #{y}"
    @end.x = x
    @end.y = y

  mouseUp: (x, y) ->
    # console.log "mouseUp #{x}, #{y}"
    @end.x = x
    @end.y = y

  update: ->

  render: ->
    context = @canvas.getContext('2d')
    context.clearRect(0, 0, @canvas.width, @canvas.height)
    # context.beginPath()
    # context.moveTo(0, 0)
    # context.lineTo(@end.x, @end.y)
    # context.lineWidth = 1
    # context.strokeStyle = 'white'
    # context.stroke()
    # context.closePath()
    context.drawImage @debugImage, @end.x, @end.y

  loop: ->
    @update()
    @render()

module.exports = Game
