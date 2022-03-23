const formOne = document.getElementById('classOne');
// const formTwo = document.getElementById('classTwo');
// const formThree = document.getElementById('classThree');

// const classRooms = [
//     {
//         id_: "room1",
//         name: "Science10",
//         teacher: "jane@school.com" 
//     },
//     {
//         id_: "room2",
//         name: "Science20",
//         teacher: "jane@school.com" 
//     },
//     {
//         id_: "room3",
//         name: "Science30",
//         teacher: "jane@school.com" 
//     }
// ];

const startClassRoom = async (roomId) => {
    const host = (window.document.location.host || "localhost").replace(/:.*/, '');
    const url = 'http://' + host + `:3000/startClassRoom/${roomId}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

formOne.addEventListener('submit', function(e) {
    e.preventDefault();
    // start the next classroom
    const { reservation } = startClassRoom("room1");
});

// formTwo.addEventListener('submit', function(e) {
//     e.preventDefault();
//     // start the next classroom
// });

// formThree.addEventListener('submit', function(e) {
//     e.preventDefault();
//     // start the next classroom
// });