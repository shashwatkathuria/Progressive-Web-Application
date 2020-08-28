const config = require('../config/config.js').module;

// Given by webpush documentation at https://github.com/web-push-libs/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
// Given by webpush documentation at https://github.com/web-push-libs/web-push
const vapidPublicKey = config.notifications.VAPID_PUBLIC_KEY;
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

// Requesting for notifications permission
Notification.requestPermission(result =>  {
  if (result === 'granted') {
    // Notifications enabled
  }
});

navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      // Push notifications unsupported
      return;
    }
    // Ask server initially
    askForNotification(registration);
    // Keep asking server for notifications every half an hour
    setInterval(() => askForNotification(registration), 1000 * 60 * 30);
  })

function askForNotification(registration) {
  registration.pushManager
        .subscribe({
          userVisibleOnly: true, //Always display notifications
          applicationServerKey: convertedVapidKey
        })
        .then(subscription => {
          // Post request for task notifications along with subscription
          fetch('/notifications/tasks', {
              method: 'POST',
              body: JSON.stringify(subscription),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          }).catch(err => console.error("Push subscription error: ", err));
        }).catch(err => console.error("Push subscription error: ", err));
}
