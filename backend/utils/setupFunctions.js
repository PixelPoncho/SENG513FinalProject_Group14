const { matchMaker } = require("colyseus");

const instantiateClassRoom = async (options) => {
    return await matchMaker.create("classroom", options);
};

module.exports = { instantiateClassRoom };