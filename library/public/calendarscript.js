let currentYear = 0;
let currentDay = 0;    // Days since new year
let calendarviewCurrentViewYear = 0;
let calendarviewPreviousViewYearHTML = {};
let calendarviewCurrentViewYearHTML = {};
let calendarviewNextViewYearHTML = {};

// The values in the calendar object uses 1-based indexing, to make it more readable for non-coder people
const calendarInputData = {
  weekLength : 10,
  structure : [{type : "month",   days : 30, name : "Hammer"},
               {type : "day",                name : "Midwinter"},
               {type : "month",   days : 30, name : "Alturiak"},
               {type : "month",   days : 30, name : "Ches"},
               {type : "month",   days : 30, name : "Tarsakh"},
               {type : "day",                name : "Greengrass"},
               {type : "month",   days : 30, name : "Mirtul"},
               {type : "month",   days : 30, name : "Kythorn"},
               {type : "month",   days : 30, name : "Flamerule"},
               {type : "day",                name : "Midsummer"},
               {type : "leapday",            name : "Shieldmeet", everyNyears : 4, baseYear : 0},
               {type : "month",   days : 30, name : "Eleasis"},
               {type : "month",   days : 30, name : "Eleint"},
               {type : "day",                name : "Highharvestide"},
               {type : "month",   days : 30, name : "Marpenoth"},
               {type : "month",   days : 30, name : "Uktar"},
               {type : "day",                name : "Feast of the Moon"},
               {type : "month",   days : 30, name : "Nightal"}]
}


function buildCalendarHTML(year) {
  calendarHTMLArray = [];
  calendarHTMLArray.push("<tr><td colspan=" + calendarInputData.weekLength + " class='year'>" + year);
  dayOfYear = 0;
  for (let i = 0; i < calendarInputData.structure.length; i++) {
    if (calendarInputData.structure[i].type == "month") {
      calendarHTMLArray.push("<tbody class='month'>");
      calendarHTMLArray.push("<tr><td colspan=" + calendarInputData.weekLength + " class='monthName'>" + calendarInputData.structure[i].name);
      dayOfWeek = 0;
      for (let d = 0; d < calendarInputData.structure[i].days; d++) {
        if (dayOfWeek >= calendarInputData.weekLength) {
          dayOfWeek = 0;
        }
        if (dayOfWeek == 0) {
          calendarHTMLArray.push("<tr>");
        }
        calendarHTMLArray.push("<td class='day' id='" + year + dayOfYear + "'> " + (d + 1));
        dayOfWeek++;
        dayOfYear++;
      }
    } else if (calendarInputData.structure[i].type == "day") {
      calendarHTMLArray.push("<tr><td colspan=" + calendarInputData.weekLength + " class='extraDay' id='" + year + dayOfYear + "'>" + calendarInputData.structure[i].name);
      dayOfYear++;
    } else if (calendarInputData.structure[i].type == "leapday") {
      if (((year - calendarInputData.structure[i].baseYear) % calendarInputData.structure[i].everyNyears) == 0) {
        calendarHTMLArray.push("<tr><td colspan=" + calendarInputData.weekLength + " class='extraDay' id='" + year + dayOfYear + "'>" + calendarInputData.structure[i].name);
        dayOfYear++;
      }
    }
  }
  return calendarHTMLArray.join("");
}


// Thanks to Baaaaz and tdue21 for their assistance in developing this function
async function getLibProperty(propertyName) {
  const macro = '[r:getLibProperty("' + propertyName + '", "icarean.0001.Time_tracker")]';
  let r = await fetch("macro:evaluateMacro@lib:icarean.0001.Time_tracker", { method: "POST", body: macro });
  return await r.text();
}


async function init() {
  currentYear = parseInt(await getLibProperty("currentYear"));
  currentDay = parseInt(await getLibProperty("currentDay"));
  calendarviewCurrentViewYear = currentYear;
  // Show the calendar
  document.getElementById("calendar").innerHTML = buildCalendarHTML(calendarviewCurrentViewYear);
  currentDayElement = document.getElementById("" + currentYear + (currentDay - 1));
  currentDayElement.classList.add("currentDay");
}


init();
