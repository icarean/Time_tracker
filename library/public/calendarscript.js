

function displayCalendar() {
  tableHTML = "";
  
  // Month 1
  tableHTML += "<tbody class='month'>"
  tableHTML += "<tr><td colspan='10' class='monthName'>Flamerule";
  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let d = 1; d <= 10; d++) {
      tableHTML += "<td> " + ((i*10)+d);
    }
  }
  tableHTML += "</tbody><tr>";
  
  // Intermediary holidays
  tableHTML += "<tr><td colspan='10' class='holiday'>Midsummer";
  tableHTML += "<tr><td colspan='10' class='holiday'>Shieldmeet";
  tableHTML += "<tr>";
  
  // Month 2
  tableHTML += "<tbody>"
  tableHTML += "<tr><td colspan='10' class='monthName'>Eleasis";
  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let d = 1; d <= 10; d++) {
      tableHTML += "<td> " + ((i*10)+d);
    }
  }
  tableHTML += "</tbody><tr>";

  // Show the calendar
  document.getElementById("calendar").innerHTML = tableHTML;
}
/*
function initButtons() {

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
} */

async function init() {
/*  currentYear = parseInt(await getLibProperty("currentYear"));
  currentDay = parseInt(await getLibProperty("currentDay"));
  currentTime = parseInt(await getLibProperty("currentTime"));
  timeFormat12h = parseInt(await getLibProperty("timeFormat12h"));
  
  initButtons();
*/
  displayCalendar();
}

init();
