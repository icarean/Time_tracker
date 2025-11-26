Setting currentYear to default value: [r: currentYear = data.getStaticData("icarean.0001.Time_tracker", "public/property_defaults/currentYear")]
[h: setLibProperty("currentYear", currentYear)]
Setting currentDay to default value: [r: currentDay = data.getStaticData("icarean.0001.Time_tracker", "public/property_defaults/currentDay")]
[h: setLibProperty("currentDay", currentDay)]
Setting currentTime to default value: [r: currentTime = data.getStaticData("icarean.0001.Time_tracker", "public/property_defaults/currentTime")]
[h: setLibProperty("currentTime", currentTime)]
Setting timeFormat12h to default value: [r: timeFormat12h = data.getStaticData("icarean.0001.Time_tracker", "public/property_defaults/timeFormat12h")]
[h: setLibProperty("timeFormat12h", timeFormat12h)]

Creating a token for macros.
[h: id = createToken(json.set("{}", "tokenImage", "lib://icarean.0001.Time_tracker/images/Time_tracker_logo.png", "name", "Time_tracker_macros", "x", 1, "y", 1))]
[h: setViewArea(-3,-3, 3, 3, 0)]

Creating the 'OPEN TIME TRACKER' macro
[h:createMacro("OPEN TIME TRACKER", '[macro("OPEN TRACKER@lib:icarean.0001.Time_tracker"):""]', "group=Time_tracker;autoExecute=true;color=#77ff99;playerEditable=0", ";", "Time_tracker_macros")]

Creating the 'Open calendar' macro
[h:createMacro("Open calendar", '[macro("Open calendar@lib:icarean.0001.Time_tracker"):""]', "group=Time_tracker;autoExecute=true;color=#77ff99;playerEditable=0", ";", "Time_tracker_macros")]

Creating the 'Settings' macro
[h:createMacro("Settings", '[macro("Settings@lib:icarean.0001.Time_tracker"):""]', "group=Time_tracker;autoExecute=true;color=#33bb55;playerEditable=0", ";", "Time_tracker_macros")]

Showing welcome (Read Me)
[h:html.dialog5("Read Me", "lib://icarean.0001.Time_tracker/readme.html", "width=600; height=500; temporary=1; noframe=0")]

