/*
  App needs at least one active future alarms in alarm or qalarm app
  A valid alarm is consedered when newer than (default: 30 minutes) from now
  Sleepphase begins earliest 10 minutes after non Movement

  state flow:
    #1  undefined:wait-data ->
    #2    (no move >= 10 minutes) -> 1:sleep
    #3      (on move) -> -1:waked-up
    #4        (on remove before 10 minutes) -> 0:awake
    #5        or #2
    #6    (on move) -> 0:awake
*/
const DEFAULT_SETTINGS = {
  showTimeSec:false, //true,'unlocked'
  preAlertMinutes:30, 
  sleepThreshMinutes=10, 
  moveThres=(process.env.HWVERSION==2) ? 0.008 : 0.006, //Bangle 2 sensor seems more sensitive
  disableBangleWakeOn=true //deactivate twist etc.
};
const SETTINGS         = require("Storage").readJSON("sleepphasealarm.json",1)||DEFAULT_SETTINGS;
//const SETTINGS = DEFAULT_SETTINGS; //DEV-Option
const ACTIVE_TIMERS    = ((require("Storage").readJSON("alarm.json",1)||[]).concat(require("Storage").readJSON("qalarm.json",1))||[]).filter(a=>a.on);
const ALERT_BEFORE_MS  = SETTINGS.preAlertMinutes * 60000; //30 minutes

// Sleep/Wake detection with Estimation of Stationary Sleep-segments (ESS):
// Marko Borazio, Eugen Berlin, Nagihan Kücükyildiz, Philipp M. Scholl and Kristof Van Laerhoven, "Towards a Benchmark for Wearable Sleep Analysis with Inertial Wrist-worn Sensing Units", ICHI 2014, Verona, Italy, IEEE Press, 2014.
// https://ubicomp.eti.uni-siegen.de/home/datasets/ichi14/index.html.en
//
// Function needs to be called for every measurement but returns a value at maximum once a second (see winWidth)
// start of sleep marker is delayed by sleepthresh due to continous data reading
const winWidth=13;
var essValues = [];

var slpSec = 0;
var slpStart = undefined;
var slpPairs = []; //collects sleep periods = start/end 

function calcESS(val) {
  const moveThres = SETTINGS.accelThres;
  const sleepThreshSec = SETTINGS.sleepThreshMinutes * 60000;
  essValues.push(val);

  if (essValues.length >= winWidth) {
    // calculate standard deviation over ~1s 
    const mean = essValues.reduce((prev,cur) => cur+prev) / essValues.length;
    const stddev = Math.sqrt(essValues.map(val => Math.pow(val-mean,2)).reduce((prev,cur) => prev+cur) / essValues.length);
    essValues = [];

    const nonmot = stddev < moveThres; // check for non-movement according to the threshold
    console.log(Bangle.getOptions().powerSave||undefined, stddev, moveThres, nonmot, slpSec, slpSec >= sleepThreshSec, deepslpsnds); //DEV-option

    if (nonmot) { //stationary
      slpSec += 1;
      if (slpSec >= sleepThreshSec) {
        if (!slpStart) slpStart = new Date(); //remember sleep-start
        return 1; // sleeping
      }
    } else { //moved
      slpSec=0;
      if (slpStart) { //waked-up
        slpPairs.push({"start": slpStart, "end": new Date()}) //add pair
        slpStart = undefined; //reset start
        return -1; //waked-up
      }
      return 0; //awake
    }
    return undefined; //no-state yet
  }
}

// future alarm from (q)alarm app 
var nextAlarm;
ACTIVE_TIMERS.forEach(a => {
  const NOW = new Date();
  var dateAlarm;
  if (a.hasOwnProperty('hr')) { //alarm app a.hr
    const alarmHour = a.hr/1;
    const alarmMinute = Math.round((a.hr%1)*60);
     dateAlarm = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), alarmHour, alarmMinute);
    if (dateAlarm - ALERT_BEFORE_MS < NOW) // dateAlarm in the past, add 24h
      dateAlarm.setTime(dateAlarm.getTime() + 86400000);

    } else if (a.hasOwnProperty('t') && a.daysOfWeek.some(d => d)) { //qalarm with at least on active weekday
    var dateAlarm = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
    dateAlarm.setTime(dateAlarm.getTime() + a.t);
    var weekday = NOW.getDay();
    while (dateAlarm - ALERT_BEFORE_MS < NOW || !a.daysOfWeek[weekday]) {
      dateAlarm.setTime(dateAlarm.getTime() + 86400000);
      weekday = (weekday+1)%7;
    }
  }
  if (dateAlarm && (!nextAlarm || dateAlarm<nextAlarm))
    nextAlarm = dateAlarm;
});

const LINES = 4; //0 - 3
var L_HEIGTH; //calculated after load/draw widgets!
var CENTER_X;
function init() {
  L_HEIGTH = Bangle.appRect.h/LINES;
  CENTER_X = Bangle.appRect.w/2+Bangle.appRect.x;

  if (disableBangleWakeOn) { //BTNs are still active
    wakeOns = ['wakeOnFaceUp', 'wakeOnTouch', 'wakeOnTwist'];
  }
}

function drawStringLine(s, lineNo, forceSize) {
  g.clearRect(Bangle.appRect.x, lineNo*L_HEIGTH+Bangle.appRect.y, Bangle.appRect.x2, lineNo*L_HEIGTH+L_HEIGTH+Bangle.appRect.y);

  /* switch (lineNo) { //DEV-Option
    case 1:
      g.setColor('#FF0000'); break;
    case 2:
      g.setColor('#00FF00'); break;
    case 3:
      g.setColor('#0000FF'); break;
    default:
      g.setColor('#000000'); break;
  }
  g.fillRect(Bangle.appRect.x, CENTER_LINE_Y, Bangle.appRect.x2, CENTER_LINE_Y+L_HEIGTH);
  */
  
  g.reset();
  g.setFont("Vector", forceSize || L_HEIGTH*0.8);
  g.setFontAlign(0, 0); // center/center
  g.drawString(s, CENTER_X, lineNo*L_HEIGTH+L_HEIGTH/2+Bangle.appRect.y);
}

function drawApp() {
  const NOW = new Date();
  g.clearRect(Bangle.appRect.x,Bangle.appRect.y,Bangle.appRect.x2,Bangle.appRect.y2);
  var aHr = nextAlarm.getHours();
  var aMin = nextAlarm.getMinutes();
  var aDayDelta = (nextAlarm.getDay()-NOW.getDay()+7)%7;
  drawStringLine("Sleep Phase Alarm", 0, 18); //TODO: locale
  drawStringLine((aHr < 10 ? "0" : "") + aHr + ":" + (aMin < 10 ? "0" : "") + aMin + (aDayDelta > 0 ? " +" + aDayDelta  + "d" : "" ), 1);
  //drawStringLine("wait-state", 2);
  function drawTime() {
    if (Bangle.isLCDOn()) {
      const NOW = new Date();
      var tHr = NOW.getHours();
      var tMin = NOW.getMinutes();
      var tSec = NOW.getSeconds();
      drawStringLine((tHr < 10 ? "0" : "") + tHr + ":" + (tMin < 10 ? "0" : "") + tMin + (SETTINGS.showTimeSec ? ":" + (tSec < 10 ? "0" : "") + tSec : ""), 3);
    }
    if (SETTINGS.showTimeSec === true || (SETTINGS.showTimeSec === 'unlocked' && Bangle.isLocked() === false))
      setTimeout(drawTime, 1000 - NOW.getMilliseconds()); // schedule to next second
    else
      setTimeout(drawTime, 60000 - (NOW.getSeconds() * 1000) - NOW.getMilliseconds()); // schedule to next minute
  }

  drawTime();
}

var buzzCount = 19;
function buzz() { //TODO: buzz end Prompt
  if ((require('Storage').readJSON('setting.json',1)||{}).quiet>1) return; // total silence
  Bangle.setLCDPower(1);
  Bangle.buzz().then(()=>{
    if (buzzCount--) {
      setTimeout(buzz, 500);
    } else {
      // back to main after finish
      setTimeout(load, 1000); //TODO: sleep summuary
    }
  });
}

// run
var minAlarm = new Date();
var measure = true;
var totalSleepSec = 0;
if (nextAlarm !== undefined) {
  Bangle.loadWidgets();
  Bangle.drawWidgets();
  initScreen(); //detect upper and or lower widgets-area
  minAlarm.setTime(nextAlarm.getTime() - (ALERT_BEFORE_MS)); // minimum alert 30 minutes early
  setInterval(function() {
    const now = new Date();
    const swest = calcESS(Bangle.getAccel().mag);

    if (Bangle.isLCDOn()) {
      let stateTxt;
      switch (swest) { //TODO: locale
        case undefined: stateTxt="wait-data"; break;
        case -1: stateTxt="waked-up"; break;
        case  1: stateTxt="sleeping"; break;
        default: stateTxt="awake"; break;
      }
      drawStringLine(stateTxt, 2);
    }

    if (measure && (now >= nextAlarm || (swest !== undefined && now >= minAlarm))) { //(measure && now >= minAlarm && swest !== undefined) {
      measure = false;
      if (totalSleepSec === undefined) { //collect once
        if (slpStart !== undefined) slpPairs.push({"start":slpStart, "end":new Date()}); //collect last open interval
        totalSleepSec = slpPairs.reduce((sum, period) => sum += period.end - period.start)
        E.showMessage(deepslpsecs); //TODO: title, locale, nice, message
      }
      //setTimeout(load, 1000);
      if (now < nextAlarm) {
        buzz();
      } //else: The alarm widget should handle alarm
    }
  }, 80); // 12.5Hz
  drawApp();
} else {
  E.showMessage('No active (q)alarm!'); //TODO: locale
  setTimeout(load, 1000);
}
// BTN2 to menu, BTN3 to main
setWatch(Bangle.showLauncher, (process.env.HWVERSION==2) ? BTN1 : BTN2, { repeat: false, edge: "falling" });
if (process.env.HWVERSION==1) setWatch(() => load(), BTN3, { repeat: false, edge: "falling" });
