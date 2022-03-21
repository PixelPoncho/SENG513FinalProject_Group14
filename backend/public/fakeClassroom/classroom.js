const joinClassRoom = async (classId) => {
    return await client.join("classroom", { classId });
};

console.log("Hello World");

var host = (window.document.location.host || "localhost").replace(/:.*/, '');
console.log(host);
var classId = window.document.location.href.split("/").at(-1);
console.log(classId);
var client = new Colyseus.Client('ws://' + host + ':3000');
var room = joinClassRoom(classId);
console.log(room);



// $(window).on("load", function() {
//     host = (window.document.location.host || "localhost").replace(/:.*/, '');
//     classId = window.document.location.href.split("/").at(-1);
//     console.log(classId);
//     client = new Colyseus.Client('ws://' + host + ':3000');
//     room = joinClassRoom(classId);
//     console.log(room);
// });
