"use strict";
var mysql = requirejs('mysql');
var entry = requirejs("./entry.js");
class Card {
    constructor(results) {
        if (results != "") {
            this.name = results[0].name;
            this.owner = results[0].owner;
            this.description = results[0].description;
            this.card_id = results[0].card_id;
        } else {
            console.log("Cannot read");
        }
    }

    setName(name) {
        this.name = name;
    }

    setTeam(team) {
        this.team = team;
    }

    setDescription(description) {
        this.description = description;
    }

    getName() {
        return this.name;
    }

    getTeam() {
        return this.team;
    }

    getDescription() {
        return this.description;
    }

    getID() {
        return this.card_id;
    }

    toString() {
        //Order of results: name, owner, description, card_id
        var print = this.name + " " + this.owner + " " + this.description;
        print += " " + this.card_id;
        return print;
    }

    updateView() {

    }
}

module.exports = Card;
