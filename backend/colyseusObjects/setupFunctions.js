const { matchMaker } = require("colyseus");

const startClassRoom = async (options) => {
    return await matchMaker.createRoom("classroom", options);
};

module.exports = { startClassRoom };