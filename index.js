const check = () =>{

}
// I added a function that can be used to register a service worker.
const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js'); //notice the file name
    return swRegistration;
}
const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log(Notification.permission)
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
        // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
}
const main = async (charge, chargingordischargingtime) => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    showLocalNotification(charge, chargingordischargingtime, swRegistration);
}
