{ InputField } = require 'inputField'

# setup device for presentation
device = new Framer.DeviceView();

device.setupContext()
device.deviceType = "google-nexus-6p"
device.contentScale = 1

deviceHeight = device.screen.height
deviceWidth = device.screen.width

app = Framer.Importer.load("app.framer/imported/app@1x")

# variables to hold a scale value we’ll use later
initialScale = 0.2

# array of our actions
actionButtons = []

# the input element from module
taskInput = new InputField
  name: "task"
  type: "text-area"
  width:  deviceWidth
  height: deviceHeight - app.keyboard.height
  index: 0
  color: "DarkCyan"
  backgroundColor: "#f5f5f5"
  fontSize: 200
  indent: 120
  placeHolder: "Add task"
  placeHolderFocus: ""
  autoCapitalize: true

# hide some layers for the initial state
app.actions.opacity = 0
app.overlay.opacity = 0
app.iconWrite.opacity = 0
app.keyboard.opacity = 0
app.keyboard.y = app.keyboard.height + deviceHeight
taskInput.opacity = 0

# set initial rotation for the icon
app.iconWrite.rotation = -180

# create an array of action layers (Add, Reminder, Task)
for i in [0...3]
 actionButtons.push app["action#{i+1}"]

# Add initial scale value to action buttons
for action in actionButtons
 action.scale = initialScale

# define states
app.overlay.states.add
  openActions: { opacity: 1 }
app.overlay.states.animationOptions = curve: "spring(400, 20, 0)"

app.actions.states.add
  openActions: { opacity: 1 }
app.actions.states.animationOptions = curve: "spring(400, 20, 0)"

app.keyboard.states.add
  openInput: { opacity: 1; y: deviceHeight - app.keyboard.height}
app.keyboard.states.animationOptions = { curve: "linear", time: 0.1 }

for action in actionButtons
  action.states.add
    openActions: { scale: 1 }
  action.states.animationOptions = curve: "spring(500, 30, 0)"

app.iconPlus.states.add
  openActions: {
    opacity: 0,
    rotation: 90
  }
app.iconPlus.states.animationOptions = curve: "spring(500, 30, 0)"

app.iconWrite.states.add
  openActions: {
    opacity: 1,
    rotation: 0
  }
app.iconWrite.states.animationOptions = curve: "spring(500, 30, 0)"

taskInput.states.add
  openInput: { opacity: 1 }
taskInput.states.animationOptions = curve: "spring(400, 20, 0)"

# functions
switchOptions = (state) ->
  for action in actionButtons
    action.states.switch(state)

  app.overlay.states.switch(state)
  app.actions.states.switch(state)
  app.iconPlus.states.switch(state)
  app.iconWrite.states.switch(state)

switchInput = (state) ->
  taskInput.states.switch(state)
  app.keyboard.states.switch(state)

# events
app.floatingButton.on Events.Click, ->
  switchOptions("openActions")

app.overlay.on Events.Click, ->
  switchOptions("default")

app.action2.on Events.Click, ->
  taskInput.index = 1
  switchInput("openInput")

app.keyboard.on Events.Click, ->
  taskInput.index = 0
  switchInput("default")
  switchOptions("default")
