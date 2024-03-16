<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Time_tracker settings</title>
<link rel="stylesheet" href="lib://icarean.0001.Time_tracker/style.css?cachelib=false">
</head>

<body>
<div class="background-container">
  <img id="nightBackground" class="sky" src="lib://icarean.0001.Time_tracker/images/Stars.jpg">
</div>
<div class="foreground-container">

<fieldset>
  <legend>Time format</legend>
  <div>
    <input type="radio" id="12h" name="timeFormat" value="12h" />
    <label for="12h">12-hour</label>
  </div>
  <div>
    <input type="radio" id="24h" name="timeFormat" value="24h" />
    <label for="24h">24-hour</label>
  </div>
</fieldset>


</div>

<script type="text/javascript" src="lib://icarean.0001.Time_tracker/settingsscript.js?cachelib=false">
</script>

</body>
</html>
