if ('serviceWorker' in navigator && location.protocol === 'https:') {
  console.log('Starting service worker...');
  navigator.serviceWorker.register('./service-worker.js').then((reg) => {
    reg.onupdatefound = () => {
      console.log('Updating service worker...');
      const installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker && navigator.serviceWorker.controller) {
          window.location.reload();
        }
      };
    };
  }).catch((err) => {
    console.log(err);
  });
}
