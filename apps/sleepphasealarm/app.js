<<<<<<< Updated upstream
const alarms = require("Storage").readJSON("alarm.json",1)||[];
const active = alarms.filter(a=>a.on);
=======
/*
  App needs at least one active future alarm sein in alarm or qalarm app
  A valid alarm is consedered when newer than (default: 30 minutes) from now
  Sleepphase begins earliest 10 minutes after non Movement
*/
const SETTINGS = require("Storage").readJSON("sleepphasealarm.json",1)||{showTimeSec: false, preAlertMinutes: 30};
const ACTIVE = ((require("Storage").readJSON("alarm.json",1)||[]).concat(require("Storage").readJSON("qalarm.json",1))||[]).filter(a=>a.on);
const ALERT_BEFORE_MS = SETTINGS.preAlertMinutes * 60000; //30 minutes
>>>>>>> Stashed changes

// Sleep/Wake detection with Estimation of Stationary Sleep-segments (ESS):
// Marko Borazio, Eugen Berlin, Nagihan Kücükyildiz, Philipp M. Scholl and Kristof Van Laerhoven, "Towards a Benchmark for Wearable Sleep Analysis with Inertial Wrist-worn Sensing Units", ICHI 2014, Verona, Italy, IEEE Press, 2014.
// https://ubicomp.eti.uni-siegen.de/home/datasets/ichi14/index.html.en
//
// Function needs to be called for every measurement but returns a value at maximum once a second (see winwidth)
// start of sleep marker is delayed by sleepthresh due to continous data reading
const winwidth=13;
const nomothresh=(process.env.HWVERSION==2) ? 0.008 : 0.006;
const sleepthresh=600;
var ess_values = [];
var slsnds = 0;

var slpPairs = []; //collects
var slpStart = undefined;

function calc_ess(val) {
  ess_values.push(val);

  if (ess_values.length == winwidth) {
    // calculate standard deviation over ~1s 
    const mean = ess_values.reduce((prev,cur) => cur+prev) / ess_values.length;
    const stddev = Math.sqrt(ess_values.map(val => Math.pow(val-mean,2)).reduce((prev,cur) => prev+cur)/ess_values.length);
    ess_values = [];

    // check for non-movement according to the threshold
    const nonmot = stddev < nomothresh;

    // amount of seconds within non-movement sections
    console.log(stddev, nomothresh, nonmot, slsnds, slsnds >= sleepthresh, deepslpsnds);
    if (nonmot) {
      slsnds+=1;
      if (slsnds >= sleepthresh) {
        if (!slpStart) slpStart = new Date(); //remember sleep-start
        return true; // sleep
      }
    } else {
      slsnds=0;
      if (slpStart) {
        slpPairs.push({"start": slpStart, "end": new Date()}) //add pair
        slpStart = undefined;
      }

      return false; // awake
    }
  }
}

// future alarm from (q)alarm app 
var nextAlarm;
ACTIVE.forEach(a => {
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
var L_HEIGTH; //calculated after laod/draw widgets!
var CENTER_X;
function initScreen() {
  L_HEIGTH = Bangle.appRect.h/LINES;
  CENTER_X = Bangle.appRect.w/2+Bangle.appRect.x;
}

function drawStringLine(s, lineNo, forceSize) {
  g.clearRect(Bangle.appRect.x, lineNo*L_HEIGTH+Bangle.appRect.y, Bangle.appRect.x2, lineNo*L_HEIGTH+L_HEIGTH+Bangle.appRect.y);

  /*switch (lineNo) {
    case 1:
      g.setColor('#FF0000'); break;
    case 2:
      g.setColor('#00FF00'); break;
    case 3:
      g.setColor('#0000FF'); break;
    default:
      g.setColor('#000000'); break;
  }
  g.fillRect(Bangle.appRect.x, CENTER_LINE_Y, Bangle.appRect.x2, CENTER_LINE_Y+L_HEIGTH);*/
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
  drawStringLine("Sleep Phase Alarm", 0, 18);
  drawStringLine((aHr < 10 ? "0" : "") + aHr + ":" + (aMin < 10 ? "0" : "") + aMin + (aDayDelta > 0 ? " +" + aDayDelta  + "d" : "" ), 1);
  drawStringLine("wait state", 2);
  function drawTime() {
    if (Bangle.isLCDOn()) {
      const NOW = new Date();
      var tHr = NOW.getHours();
      var tMin = NOW.getMinutes();
      var tSec = NOW.getSeconds();
      drawStringLine((tHr < 10 ? "0" : "") + tHr + ":" + (tMin < 10 ? "0" : "") + tMin + (SETTINGS.showTimeSec ? ":" + (tSec < 10 ? "0" : "") + tSec : ""), 3);
    }
    if (SETTINGS.showTimeSec)
      setTimeout(drawTime, 1000 - NOW.getMilliseconds()); // schedule to next second
    else
      setTimeout(drawTime, 60000 - (NOW.getSeconds() * 1000) - NOW.getMilliseconds()); // schedule to next minute
  }

  drawTime();
}

var buzzCount = 19;
function buzz() {
  if ((require('Storage').readJSON('setting.json',1)||{}).quiet>1) return; // total silence
  Bangle.setLCDPower(1);
  Bangle.buzz().then(()=>{
    if (buzzCount--) {
      setTimeout(buzz, 500);
    } else {
      // back to main after finish
      setTimeout(load, 1000);
    }
  });
}

// run
var minAlarm = new Date();
var measure = true;
var totalSleep;
if (nextAlarm !== undefined) {
  Bangle.loadWidgets();
  Bangle.drawWidgets();
  initScreen();
  minAlarm.setTime(nextAlarm.getTime() - (ALERT_BEFORE_MS)); // minimum alert 30 minutes early
  setInterval(function() {
    const now = new Date();
    const acc = Bangle.getAccel().mag;
    const swest = calc_ess(acc);

    if (swest !== undefined) {
      if (Bangle.isLCDOn()) {
        drawStringLine(swest ? "sleep" : "awake", 2);
      }
    }

    if (now >= nextAlarm || (measure && now >= minAlarm && swest === false)) {
      measure = false;
      if (totalSleep === undefined) {
        if (slpStart !== undefined) slpPairs.push({"start": slpStart, "end": new Date()}); //collect last open interval
        totalSleep = slpPairs.reduce((sum, pair) => sum += pair.end - pair.start)
      // The alarm widget should handle this one
        E.showMessage(deepslpsecs);
      }
      //setTimeout(load, 1000);
      if (measure && now >= minAlarm && swest === false) {
        buzz();
      }
    }
  }, 80); // 12.5Hz
  drawApp();
} else {
  E.showMessage('No active (q)alarm!');
  setTimeout(load, 1000);
}
// BTN2 to menu, BTN3 to main
setWatch(Bangle.showLauncher, (process.env.HWVERSION==2) ? BTN1 : BTN2, { repeat: false, edge: "falling" });
if (process.env.HWVERSION==1) setWatch(() => load(), BTN3, { repeat: false, edge: "falling" });
