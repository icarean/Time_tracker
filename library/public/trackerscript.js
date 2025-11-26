let currentYear = 0;
let currentDay = 0;    // Days since new year
let currentTime = 0;   // Minutes since midnight
let timeFormat12h = 1;
let moonPhase = 0;
let moonAboveHorizon = 0;
const viewWidth = 1100;
const compassPointInset = 150;
const compassPointDistance = (viewWidth - (2 * compassPointInset)) / 2;  // Distance from E to S, and from S to W, in px
const maxDebugDisplay = 10;
let debugStrs = Array(maxDebugDisplay);
let numDebugItems = 0;

function debug(debugText) {
  numDebugItems ++;
  let debugHTML = "";
  var currentDate = new Date(); 
  var timeStamp = "[" + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds() + "]";
  if (numDebugItems <= maxDebugDisplay) {
  	debugStrs[numDebugItems] = numDebugItems + ". " + timeStamp + " " + debugText;
  	for (let i = 1; i <= numDebugItems; i++) {
      debugHTML += debugStrs[i] + "<br/>";
    }
  } else {
    for (let i = 1; i < maxDebugDisplay; i++) {
      debugStrs[i] = debugStrs[i + 1];
      debugHTML += debugStrs[i] + "<br/>";
    }
    debugStrs[maxDebugDisplay] = numDebugItems + ". " + timeStamp + " " + debugText;
    debugHTML += debugStrs[maxDebugDisplay];
  }
  document.getElementById('debug').innerHTML = debugHTML;
}

// Display the time
function displayTime() {
  if (timeFormat12h) {
    // 12h format
    twelveHr = Math.floor(((currentTime<720)?currentTime:currentTime-720)/60);
    twelveHr = ((twelveHr==0)?12:twelveHr);
    timeStr = String("0" + twelveHr).slice(-2) + ":" + String("0" + (currentTime % 60)).slice(-2) + ((currentTime<720)?" am":" pm");
  } else {
    // 24h format
    timeStr = String("0" + Math.floor(currentTime / 60)).slice(-2) + String("0" + (currentTime % 60)).slice(-2) + " hrs";
  }
  document.getElementById('currentTime').innerHTML = timeStr;
}

function drawStuff() {
  // Update the background sky images
  // 4am fully night, day start to fade in
  // 8am fully day
  // 5pm fully day, day start to fade out
  // 9pm fully night
  // 4am to 9pm is 17 hours. That's 8.5 hours each side of a solar noon of 12.30pm
  if ((currentTime < 240) || (currentTime > 1260)) { dayOpacity = 0; }
  else if ((currentTime > 480) && (currentTime < 1020)) { dayOpacity = 1; }
  else if ((currentTime >= 240) && (currentTime <= 480)) { dayOpacity = (currentTime - 240) / 240; }
  else { dayOpacity = (1260 - currentTime) / 240; }
  document.getElementById("dayBackground").style.setProperty('opacity', dayOpacity);

  // Adjust moon visibility for day/night cycles
  // This would look better with a mix-blend-mode: lighten
  // but mix-blend-mode doesn't seem to work in MapTool 1.14.0
  moonBrightness = 1 - (dayOpacity * 0.75);
  document.getElementById("moonPic").style.setProperty('opacity', moonBrightness);

  updateMoon();

  // Update the hills image
  hillBrightness = dayOpacity + (Array(0.2,0.1,0.1,0,0,0,0.1,0.1)[moonPhase] * moonAboveHorizon);
  if (hillBrightness > 1) hillBrightness = 1;
  document.getElementById("hills").style.setProperty('filter', "brightness(" + hillBrightness + ")");

  // Update the sunrise/set gradient
  if ((currentTime >= 300) && (currentTime <= 480)) { lowSunOpacity = 1 - Math.abs((currentTime - 390) / 90); }  // 5am to 8am
  else if ((currentTime >= 1020) && (currentTime <= 1200)) { lowSunOpacity = 1 - Math.abs((currentTime - 1110) / 90); }  // 5pm to 8pm
  else { lowSunOpacity = 0; }
  document.getElementById("lowSun").style.setProperty('opacity', lowSunOpacity);

  // Position the Sun
  // t = 0 at 6am (currentTime = 360)
  t = currentTime - 360;
  if (t < 0) t = t + 1440;
  t = (t / 1440) * 2 * Math.PI;
  const imgOffset = 250;  // Offset due to sun image width
  // Sun rises due east and sets due west at spring and autumn equinoxes (day 80 and day 264/265)
  springDay = currentDay - 80;  // Number of days since spring equinox
  if (springDay < 1) springDay += 365 + (((currentYear - 1) % 4) == 0);  // Account for year wrap-around with leap years
  // Swing of sunrise/set over the course of the year. In the northern hemisphere, the sunset tends more northerly in summer (which shifts the representation rightward on the screen)
  // https://lens.monash.edu/@science/2019/10/11/1376902/how-the-location-of-sunrise-and-sunset-changes-throughout-the-year
  seasonXOffset = Math.sin((springDay / 365) * 2 * Math.PI) * 100;
  x = compassPointInset - Math.cos(t) * compassPointDistance + (viewWidth / 2) - imgOffset + seasonXOffset;
  seasonYOffset = Math.sin((springDay / 365) * 2 * Math.PI) * (-60);
  y = ((-1) * Math.sin(t)) * 500 + 650 + seasonYOffset;
  document.getElementById("sunPic").style.setProperty('top', y + 'px');
  document.getElementById("sunPic").style.setProperty('left', x + 'px');
}

function updateMoon() {

  // Data drawn from:
  // https://forgottenrealms.fandom.com/wiki/Sel%C3%BBne_(moon)
  // https://www.farmersalmanac.com/does-the-moon-rise-in-the-east-2782
  
  // Set the moon's phase
  // Selûne is full on Hammer 1, 1372 DR, and is full on Hammer 1, 1376 DR, and completes a full cycle of phases every ~30 days (48 full phase cycles every 4 years, which includes one leap year, so every 1461 days. Note 1372 is a leap year, which means year 0 is a leap year)
  // This lets us predict the moon phases in negative year numbers
  if (currentYear >= 0) {
  	yearAdjusted = currentYear
  } else {
  	yearAdjusted = 4 + (currentYear % 4);
  }
  fourYearCycleTime = (Array(0,366,731,1096)[yearAdjusted % 4] + currentDay - 1) * 24 * 60 + currentTime;   // How many minutes through a four year set of 48 cycles we are now
  const singleCycleDuration = 1461 * 24 * 60 / 48;  // Length of a single phase cycle in minutes
  currentCycleTime = fourYearCycleTime % singleCycleDuration;   // How many minutes through a single phase cycle we are now
  const singlePhaseDuration = singleCycleDuration / 8;
  moonPhase = Math.floor(currentCycleTime / singlePhaseDuration);
  const phaseNames = new Array("Full moon", "Waning gibbous", "Last quarter", "Waning crescent", "New moon", "Waxing crescent", "First quarter", "Waxing gibbous");
  document.getElementById('moonInfo').innerHTML = phaseNames[moonPhase];
  document.getElementById('moonPic').src = "lib://icarean.0001.Time_tracker/images/Selune_phase_" + (moonPhase + 1) + ".png";

  // Position Selûne
  // Selûne completes exactly 48 synodic rotations around Toril every 4 years (1461 days)
  const siderealPeriod = (1461 / (1461 - 48)) * 24 * 60;  // How long it takes for Selûne to get back to the same place in Toril's sky in minutes (slightly more than one day)
  currentOrbitTime = fourYearCycleTime % siderealPeriod;  // How far through a sidereal period we are currently, in minutes
  t = (currentOrbitTime / siderealPeriod) * 2 * Math.PI;
  const imgOffset = 350;  // Offset due to moon image width. Full moon should rise/set centrally
  variationOffset = Math.sin((currentCycleTime / singleCycleDuration) * 2 * Math.PI) * 100;  // Swing of moonrise/set over the course of one cycle of phases (approximately one month)
  x = compassPointInset + Math.sin(t) * compassPointDistance + (viewWidth / 2) - imgOffset + variationOffset;
  y = ((-1) * Math.cos(t)) * 500 + 700;
  r = Math.sin(t) * 45;
  document.getElementById("moonPic").style.setProperty('left', x + 'px');
  document.getElementById("moonPic").style.setProperty('top', y + 'px');
  document.getElementById("moonPic").style.setProperty('transform', 'rotate('+r+'deg)');
}

function addYear(y) {
  leapYear = (currentYear % 4) == 0;
  maxDay = leapYear ? 366 : 365;
  addDay(y * maxDay);
}

function addMonth(m) {
  addDay(m * 30);
}

function addDay(d) {
  currentDay += d;
  leapYear = (currentYear % 4) == 0;
  maxDay = leapYear ? 366 : 365;
  if (currentDay <= 0) {
  	while (currentDay <= 0) {
  	  currentYear += -1;
  	  leapYear = (currentYear % 4) == 0;
      maxDay = leapYear ? 366 : 365;
  	  currentDay += maxDay;
  	}
  } else if (currentDay > maxDay) {
  	while (currentDay > maxDay) {
  	  currentYear += 1;
  	  currentDay -= maxDay;
  	  leapYear = (currentYear % 4) == 0;
      maxDay = leapYear ? 366 : 365;
  	}
  }
  setLibProperty("currentDay", currentDay);
  setLibProperty("currentYear", currentYear);
  document.getElementById('currentYear').innerHTML = currentYear + " DR";

  if (currentDay <= 30) { dayName = currentDay; monthName = "Hammer"; }
  else if (currentDay == 31) { dayName = "Midwinter"; monthName = ""; }
  else if ((currentDay >= 32) && (currentDay <= 61)) { dayName = currentDay-31; monthName = "Alturiak"; }
  else if ((currentDay >= 62) && (currentDay <= 91)) { dayName = currentDay-61; monthName = "Ches"; }
  else if ((currentDay >= 92) && (currentDay <= 121)) { dayName = currentDay-91; monthName = "Tarsakh"; }
  else if (currentDay == 122) { dayName = "Greengrass"; monthName = ""; }
  else if ((currentDay >= 123) && (currentDay <= 152)) { dayName = currentDay-122; monthName = "Mirtul"; }
  else if ((currentDay >= 153) && (currentDay <= 182)) { dayName = currentDay-152; monthName = "Kythorn"; }
  else if ((currentDay >= 183) && (currentDay <= 212)) { dayName = currentDay-182; monthName = "Flamerule"; }
  else if (currentDay == 213) { dayName = "Midsummer"; monthName = ""; }
  else if ((currentDay == 214) && (leapYear)) { dayName = "Shieldmeet"; monthName = ""; }
  else if ((currentDay >= 214+leapYear) && (currentDay <= 243+leapYear)) { dayName = currentDay-213-leapYear; monthName = "Eleasis"; }
  else if ((currentDay >= 244+leapYear) && (currentDay <= 273+leapYear)) { dayName = currentDay-243-leapYear; monthName = "Eleint"; }
  else if (currentDay == 274+leapYear) { dayName = "Highharvestide"; monthName = ""; }
  else if ((currentDay >= 275+leapYear) && (currentDay <= 304+leapYear)) { dayName = currentDay-274-leapYear; monthName = "Marpenoth"; }
  else if ((currentDay >= 305+leapYear) && (currentDay <= 334+leapYear)) { dayName = currentDay-304-leapYear; monthName = "Uktar"; }
  else if (currentDay == 335+leapYear) { dayName = "Feast of the Moon"; monthName = ""; }
  else { dayName = currentDay-335-leapYear; monthName = "Nightal"; }
  if (currentDay == 80) extraFestival = "(Spring Equinox)"
  else if (currentDay == 172) extraFestival = "(Summer Solstice)"
  else if (currentDay == 264+leapYear) extraFestival = "(Autumn Equinox)"
  else if (currentDay == 355+leapYear) extraFestival = "(Winter Solstice)"
  else extraFestival = " ";
  document.getElementById('currentMonth').innerHTML = monthName;
  document.getElementById('currentDay').innerHTML = dayName;
  document.getElementById('extraFestival').innerHTML = extraFestival;

  // Try to sort out seasons
  // https://rpg.stackexchange.com/questions/153676/when-are-the-seasons-in-the-forgotten-realms-calendar
  if ((currentDay >= 355+leapYear) || (currentDay < 80)) { oldSeason = "Winter"; }
  else if (currentDay >= 264+leapYear) { oldSeason = "Autumn"; }
  else if (currentDay >= 172) { oldSeason = "Summer"; }
  else { oldSeason = "Spring"; }
  document.getElementById('seasonInfo').innerHTML = oldSeason;

  drawStuff();
}

function addTime(t) {

  // Update the time value, wrap around midnight, and cascade to changing the day as needed
  currentTime += t;
  if (currentTime < 0) {
  	while (currentTime < 0) {
  	  addDay(-1);
  	  currentTime += 1440;
  	}
  } else if (currentTime >= 1440) {
  	while (currentTime >= 1440) {
  	  addDay(1);
  	  currentTime -= 1440;
  	}
  }

  // Save the time to the token
  setLibProperty("currentTime", currentTime);
  
  displayTime();
  drawStuff();
}

function allowOnlyDigits(event, maxNumber, allowLeadingZeros, previousValueElement) {
  let inputElement = event.target;
  let invalidCharacters = /[^\d]/;
  inputElement.value = inputElement.value.replace(invalidCharacters, '');  // Filter everything except numerals
  if (inputElement.value == '') {  // Replace empty value with 0
    inputElement.value = 0;
  } else {
    if (inputElement.value > maxNumber) {
      inputElement.value = document.getElementById(previousValueElement).getAttribute('data-value');  // Restore previous acceptable value
    } else {
      if (!allowLeadingZeros) {
        inputElement.value = parseInt(inputElement.value);  // Remove leading 0s
      }
      document.getElementById(previousValueElement).setAttribute('data-value', inputElement.value);  // Save value in case needs to be restored
    }
  }
}

function initButtons() {
  document.getElementById('decYear').addEventListener('click', () => addYear(-1 * document.getElementById('inputYear').value));
  document.getElementById('incYear').addEventListener('click', () => addYear(1 * document.getElementById('inputYear').value));
  document.getElementById('decMonth').addEventListener('click', () => addMonth(-1 * document.getElementById('inputMonth').value));
  document.getElementById('incMonth').addEventListener('click', () => addMonth(1 * document.getElementById('inputMonth').value));
  document.getElementById('decDay').addEventListener('click', () => addDay(-1 * document.getElementById('inputDay').value));
  document.getElementById('incDay').addEventListener('click', () => addDay(1 * document.getElementById('inputDay').value));
  document.getElementById('decTime').addEventListener('click', () => addTime(-60 * document.getElementById('inputHour').value - 1 * document.getElementById('inputMinute').value));
  document.getElementById('incTime').addEventListener('click', () => addTime(60 * document.getElementById('inputHour').value + 1 * document.getElementById('inputMinute').value));
  
  document.getElementById('inputYear').addEventListener('input', function(event) { allowOnlyDigits(event, 99, false, 'inputYearPrev'); });
  document.getElementById('inputMonth').addEventListener('input', function(event) { allowOnlyDigits(event, 99, false, 'inputMonthPrev'); });
  document.getElementById('inputDay').addEventListener('input', function(event) { allowOnlyDigits(event, 99, false, 'inputDayPrev'); });
  document.getElementById('inputHour').addEventListener('input', function(event) { allowOnlyDigits(event, 99, false, 'inputHourPrev'); });
  document.getElementById('inputMinute').addEventListener('input', function(event) { allowOnlyDigits(event, 59, true, 'inputMinutePrev'); });
}

// Thanks to Baaaaz and tdue21 for their assistance in developing this function
async function getLibProperty(propertyName) {
  const macro = '[r:getLibProperty("' + propertyName + '", "icarean.0001.Time_tracker")]';
  let r = await fetch("macro:evaluateMacro@lib:icarean.0001.Time_tracker", { method: "POST", body: macro });
  return await r.text();
}

async function setLibProperty(propertyName, propertyValue) {
  const macro = '[r:setLibProperty("' + propertyName + '", "' + propertyValue + '", "icarean.0001.Time_tracker")]';  
  let r = await fetch("macro:evaluateMacro@lib:icarean.0001.Time_tracker", { method: "POST", body: macro });
  return await r.text();
}

async function init() {
  currentYear = parseInt(await getLibProperty("currentYear"));
  currentDay = parseInt(await getLibProperty("currentDay"));
  currentTime = parseInt(await getLibProperty("currentTime"));
  timeFormat12h = parseInt(await getLibProperty("timeFormat12h"));
  
  document.getElementById("moonPic").style.zIndex = -7;
  document.getElementById("sunPic").style.zIndex = -8;
  
  initButtons();
  addYear(0);
  addDay(0);
  addTime(0);
}

init();
