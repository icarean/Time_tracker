[frame5("Time tracker", "width=1100; height=700; temporary=1; input=0; noframe=0"): {

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Time tracker</title>
<link rel="stylesheet" href="lib://icarean.0001.Time_tracker/style.css?cachelib=false">
</head>

<body>
<div class="background-container">
  <img id="nightBackground" class="sky" src="lib://icarean.0001.Time_tracker/images/Stars.jpg">
  <img id="dayBackground" class="sky" src="lib://icarean.0001.Time_tracker/images/Bluesky.jpg" style="opacity: 0.5;">
  <div id="lowSun" class="sky" style="background-image: linear-gradient(rgb(55,55,0,0.1), rgb(150,150,50,0.5), rgb(255,0,0,1)); opacity: 0;"></div>
  <img id="hills" class="land" src="lib://icarean.0001.Time_tracker/images/Grassland.png">
  <div class="compass-text bottom-left">E</div>
  <div class="compass-text bottom-centre">S</div>
  <div class="compass-text bottom-right">W</div>
</div>
<div class="foreground-container">
<table>
  <tr>
    <td class="label">Year:</td>
    <td class="time" id="currentYear">-</td>
    <td class="pad"></td>
    <td><button id="decYear" class="control">-</button></td>
    <td><button id="incYear" class="control">+</button></td>
    <!-- <td class="pad"></td>
    <td><div>+<input type="number" id="inputYear" style="width: 3em;">y</div></td>
    <td><button id="applyYear" class="control">&#8227;</button></td> -->
  </tr>
  <tr>
    <td class="label">Day:</td>
    <td id="currentDay" class="time" style="width: 10em;">-</td>
    <td class="pad"></td>
    <td><button id="decDay" class="control">-</button></td>
    <td><button id="incDay" class="control">+</button></td>
    <!-- <td class="pad"></td>
    <td><div>+<input type="number" id="inputDay" style="width: 3em;">d</div></td>
    <td><button id="applyDay" class="control">&#8227;</button></td> -->
  </tr>
  <tr>
    <td></td>
    <td><div id="extraFestival"> </div></td>
    <td class="pad"></td>
    <td></td>
    <td></td>
    <td class="pad"></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td class="label">Time:</td>
    <td id="currentTime" class="time">-</td>
    <td class="pad"></td>
    <td><button id="decTime" class="control">-</button></td>
    <td><button id="incTime" class="control">+</button></td>
    <!-- <td class="pad"></td>
    <td><div>+<input type="number" id="inputHour" style="width: 3em;">h</div></td>
    <td><div><input type="number" id="inputMinute" style="width: 3em;">m</div></td>
    <td><button id="applyTime" class="control">&#8227;</button></td> -->
  </tr>
</table>
<div>Season (pre-sundering): <span id="seasonInfo"></span></div>
<div>Moon: <span id="moonInfo"></span></div>
<div id="debug"></div>
<img id="moonPic" class="floatImage" src="">
<img id="sunPic" class="floatImage" src="lib://icarean.0001.Time_tracker/images/Sun.png" />
</div>

<script type="text/javascript" src="lib://icarean.0001.Time_tracker/trackerscript.js?cachelib=false">
</script>

</body>
</html>

}]

