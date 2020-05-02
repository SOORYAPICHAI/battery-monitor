var chargingState = document.getElementById('chargingState');
var chargingTime = document.getElementById('chargingTime');
var dichargeTime = document.getElementById('dischargeTime');
var level = document.getElementById('level');

function updateBatteryUI(battery) {
    
  const levelEl = (battery.level * 100) + '%';
  const chargingTimeEl = Math.floor(battery.chargingTime/60) + ' Minutes';
  const dichargeTimeEl = Math.floor(battery.dischargingTime/60) + ' Minutes';
  level.textContent = levelEl
  

  if (battery.charging === true) {
    console.log('Charging')
    chargingTime.textContent=chargingTimeEl
    chargingState.textContent = 'Charging'
    if(levelEl === '95%'){
        main(levelEl, chargingTimeEl);
      }
    
  } else if (battery.charging === false) {
    console.log('Discharging')
    chargingTime.textContent=dichargeTimeEl
    chargingState.textContent = 'Discharging'
    if(levelEl === '20%'){
        main(levelEl, dichargeTimeEl);
      }
    
  }
}

function monitorBattery(battery) {
  // Update the initial UI.
  updateBatteryUI(battery);

  // Monitor for futher updates.
  battery.addEventListener('levelchange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('chargingchange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('dischargingtimechange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('chargingtimechange',
    updateBatteryUI.bind(null, battery));
}

if ('getBattery' in navigator) {
  navigator.getBattery().then(monitorBattery);
} else {
  ChromeSamples.setStatus('The Battery Status API is not supported on ' +
    'this platform.');
}