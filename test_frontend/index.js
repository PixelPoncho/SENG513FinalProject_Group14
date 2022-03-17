var host = (window.document.location.host || "localhost").replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + ':3000');

client.joinOrCreate("test-room", {
    name: "Science10",
    teacher: "test@test.com"
}).then((room) => {
    console.log(`success ${room}`);
}).catch((err) => {
    console.log(`Error ${err.code} -> ${err.message}`);
});