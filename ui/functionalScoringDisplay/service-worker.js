console.log('SW Startup NOW!');

// Install Service Worker
self.addEventListener('install', function(event) {
  console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function(event) {
  console.log('activated!');
});

function send_message_to_client(client, msg) {
  console.log('client:', client);
  return new Promise(function(resolve, reject) {
    var msg_chan = new MessageChannel();

    msg_chan.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(msg, [msg_chan.port2]);
  });
}

function send_message_to_all_clients(msg) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      send_message_to_client(client, msg).then(m =>
        console.log('SW Received Message: ' + m)
      );
    });
  });
}
