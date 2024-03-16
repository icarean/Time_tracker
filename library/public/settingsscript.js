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
  timeFormat12h = parseInt(await getLibProperty("timeFormat12h"));
  if (timeFormat12h) {
    document.getElementById('12h').checked = true;
  } else {
    document.getElementById('24h').checked = true;
  }
  document.getElementById('12h').addEventListener('click', () => setLibProperty("timeFormat12h", "1"));
  document.getElementById('24h').addEventListener('click', () => setLibProperty("timeFormat12h", "0"));
}

init();
