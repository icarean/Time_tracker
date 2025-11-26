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
  <tr class="yearEtcInfo">
    <td class="label timeInput">Year</td>
    <td class="timeInput"><input type="number" class="timeInput alignRight" id="inputYear" value="1" onfocus="this.select()" onmouseup="return false" /><div id="inputYearPrev" data-value="1" hidden></div></td>
    <td class="timeInput"><table><tr><td><button type="button" id="incYear" class="control"><b>+</b></button></td></tr><tr><td><button id="decYear" class="control"><b>-</b></button></td></tr></table></td>
    <td class="time" id="currentYear">-</td>
  </tr>
  <tr class="yearEtcInfo">
    <td class="label timeInput">Month</td>
    <td class="timeInput"><input type="number" class="timeInput alignRight" id="inputMonth" value="1" onfocus="this.select()" onmouseup="return false" /><div id="inputMonthPrev" data-value="1" hidden></div></td>
    <td class="timeInput"><table><tr><td><button type="button" id="incMonth" class="control"><b>+</b></button></td></tr><tr><td><button id="decMonth" class="control"><b>-</b></button></td></tr></table></td>
    <td id="currentMonth" class="time">-</td>
  </tr>
  <tr class="yearEtcInfo">
    <td class="label timeInput">Day</td>
    <td class="timeInput"><input type="text" class="timeInput alignRight" id="inputDay" value="1" onfocus="this.select()" onmouseup="return false" /><div id="inputDayPrev" data-value="1" hidden></div></td>  <!-- The combo of onfocus and onmouseup enables auto-select. The hidden div is for restoring old value if too many digits are entered. --> 
    <td class="timeInput"><table><tr><td><button type="button" id="incDay" class="control"><b>+</b></button></td></tr><tr><td><button id="decDay" class="control"><b>-</b></button></td></tr></table></td>
    <td id="currentDay" class="time">-</td>
  </tr>
  <tr class="yearEtcInfo">
    <td class="label timeInput">Time</td>
    <td class="timeInput"><input type="text" class="timeInput" id="inputHour" value="1" onfocus="this.select()" onmouseup="return false" /><div id="inputHourPrev" data-value="1" hidden></div>:<input type="text" class="timeInput" id="inputMinute" value="00" onfocus="this.select()" onmouseup="return false" /><div id="inputMinutePrev" data-value="00" hidden></div></td>
    <td class="timeInput"><table><tr><td><button type="button" id="incTime" class="control"><b>+</b></button></td></tr><tr><td><button id="decTime" class="control"><b>-</b></button></td></tr></table></td>
    <td id="currentTime" class="time">-</td>
  </tr>
</table>
<div id="extraFestival"> </div>
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

