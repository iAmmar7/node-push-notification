console.log('Service worker loaded...', self);

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Push recieved..', data);
  self.ServiceWorkerRegistration.showNotification(data.title, {
    body: data.body,
    icon: 'https://source.unsplash.com/random',
  });
  //   self.registration.showNotification(data.title, {
  //     body: data.body,
  //     icon: 'https://source.unsplash.com/random',
  //   });
});
