# setup device for presentation
device = new Framer.DeviceView();

device.setupContext();
device.deviceType = "iphone-6-silver-hand";
device.contentScale = 1;

deviceHeight = device.screen.height

print deviceHeight

inbox = Framer.Importer.load("framer101_inbox.framer/imported/framer101_inbox")

# variables
initialFaceScale = 0.5
nameOffsetY = 10

# array
faces = []
names = []

# basic setup (hide some layers)
inbox.options.opacity = 0
for i in [0...5]
	faces.push inbox["face#{i+1}"]
for i in [0...6]
	names.push inbox["name#{i+1}"]
for face in faces
	face.scale = initialFaceScale
for name in names
	name.y += nameOffsetY
inbox.overlay.opacity = 0
inbox.iconWrite.opacity = 0
inbox.iconWrite.rotation = -90
inbox.reminder.y = deviceHeight
inbox.keyboard.y = deviceHeight

# define states
inbox.overlay.states.add
	on: { opacity: 1 }
inbox.overlay.states.animationOptions = curve: "spring(300, 30, 0)"

inbox.options.states.add
	on: { opacity: 1 }
inbox.options.states.animationOptions = curve: "spring(500, 30, 0)"

for face in faces
	face.states.add
		on: { scale: 1 }
	face.states.animationOptions = curve: "spring(500, 30, 0)"

for name in names
	name.states.add
		on: { y: name.y - nameOffsetY }
	name.states.animationOptions = curve: "spring(500, 30, 0)"

inbox.iconPlus.states.add
	on: {opacity: 0, rotation: 90 }
inbox.iconPlus.states.animationOptions = curve: "spring(500, 30, 0)"

inbox.iconWrite.states.add
	on: { opacity: 1, rotation: 0 }
inbox.iconWrite.states.animationOptions = curve: "spring(500, 30, 0)"

inbox.reminder.states.add
	on: { y: 0 }
inbox.reminder.states.animationOptions = curve: "spring(300, 30, 0)"

inbox.keyboard.states.add
	on: { y: deviceHeight - inbox.keyboard.height }
inbox.keyboard.states.animationOptions = curve: "spring(300, 30, 0)"

# functions
stateChange = (state) ->
	inbox.overlay.states.switch(state)
	inbox.options.states.switch(state)
	for face in faces
		face.states.switch(state)
	for name in names
		name.states.switch(state)
	inbox.iconPlus.states.switch(state)
	inbox.iconWrite.states.switch(state)

# events
inbox.fab.on Events.Click, ->
	stateChange("on")

inbox.overlay.on Events.Click, ->
	stateChange("default")

inbox.option4.on Events.Click, ->
	inbox.reminder.states.switch("on")
	Utils.delay 0.3, ->
		inbox.keyboard.states.switch("on")
	stateChange("default")

inbox.reminder.on Events.Click, ->
	inbox.reminder.states.switch("default")
	inbox.keyboard.states.switch("default")
