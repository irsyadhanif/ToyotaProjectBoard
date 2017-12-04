var mysql = require('mysql');
var sqlController = require('./sqlController.js');
//var entry = require("./entry.js");

function Card(results) {
    if (results != "") {
        this.name = results[0].name;
        this.owner = results[0].owner;
        this.description = results[0].description;
        this.card_id = results[0].card_id;
    } else {
        console.log("Cannot read");
	}
}

Card.prototype.setName = function(name) {
    this.name = name;
};

Card.prototype.setTeam = function(team) {
    this.team = team;
};

Card.prototype.setDescription = function(description) {
    this.description = description;
};

Card.prototype.getName = function() {
    return this.name;
};

Card.prototype.getTeam = function() {
    return this.team;
};

Card.prototype.getDescription = function() {
    return this.description;
};

Card.prototype.getID = function() {
    return this.card_id;
};

Card.prototype.toString = function() {
    //Order of results: name, owner, description, card_id
    var print = this.name + " " + this.owner + " " + this.description;
    print += " " + this.card_id;
    return print;
};

Card.prototype.updateView = function() {

};

module.exports = Card;
