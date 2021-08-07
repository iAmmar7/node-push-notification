const publicVapidKey = 'BKrgeRnRgvRg8UdhqU8RJcFElCKoZo4GdOTjMjt4LYzEwOdgcvsjcDtIo8x5ozzDC8k3XuNxUNJZX1y1HrJnZpw';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

// Register service worker, Register Push, Send Push
async function send() {
  // Regiser service worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  console.log('Service worker registered...');

  // Register push
  console.log('Registering push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });
  console.log('Push registerd...');

  // Send push notification
  console.log('Sending push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('Push sent...');
}
