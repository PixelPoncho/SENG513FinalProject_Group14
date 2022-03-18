var host = (window.document.location.host || "localhost").replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + ':3000');
