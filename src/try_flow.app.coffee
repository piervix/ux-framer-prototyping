# Create layers
layerA = new Layer
    backgroundColor: "#00AAFF"
    size: Screen.size

layerB = new Layer
    backgroundColor: "#FFCC33"
    width: 500
    height: Screen.height

# Set up FlowComponent
flow = new FlowComponent
flow.showNext(layerA)

# Show overlay on click
layerA.onClick ->
    flow.showOverlayLeft(layerB)
