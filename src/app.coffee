device = new Framer.DeviceView();

device.setupContext();
device.deviceType = "iphone-6-silver-hand";
device.contentScale = 1;

inbox = Framer.Importer.load("framer101_inbox.framer/imported/framer101_inbox")

inbox.fab.on Events.Click, ->
   print "clicked!"
