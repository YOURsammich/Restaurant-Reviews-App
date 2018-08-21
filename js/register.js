if ('serviceWorker' in navigator) {
    console.log('done it')
  navigator.serviceWorker.register('/js/sw.js');
}