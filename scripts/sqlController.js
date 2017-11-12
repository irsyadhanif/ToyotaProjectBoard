"use strict";
var mysql = requirejs('mysql');
var card = requirejs('./card.js');

class SQLController {
    constructor(host, username, password, database) {
        this.connection = mysql.createConnection({
            host:     host,
            user:     username,
            password: password,
            database: database
        });
        this.connection.connect();
    }

    endConnection() {
        this.connection.end();
    }

    SQLInsert(entry) {
        var table = entry.getTable();
        var entries = entry.getEntries();
        var fields = entry.getFields();

        var query = "INSERT INTO " + table;
        query += " (" + fields.toString() + ") values";
        query += " (" + entries.toString()+ ")";
        this.connection.query(query, function (error, results,fields) {
            if (error) throw error;
            console.log('Entry created');
        });

    }


    SQLSelect(entry) {
        var table = entry.getTable();
        var query = "SELECT * from " + table + ";";
        //console.log(query);
        var result = this.connection.query(query, function (error, results, fields) {
            if (error) throw error;
            return results;
        });
        //console.log(result);
        return result;
    }

    SQLDelete(card) {
        // get info - table name, id
        //var table = card.getTable();
        //var id    = card.getID();
        var table = "test";
        // construct sql query - DELETE FROM <table> WHERE ID = <ID>
        var query = "DELETE FROM " + table + " WHERE ID = " + card;

        this.connection.query(query, function (error, results, field) {
            if (error) throw error;
            console.log('Entry deleted.');
        });
    }

    SQLEdit(card, entry) {
        // get card info - id
        var table   = card.getTable();
        var id      = card.getID();
        var entries = entry.getEntries();
        var fields  = entry.getFields();
        // entry represents the entries that will be updated
        var updatedEntr = "";
        for (i = 0; i < entries.length; i++) {
            updatedEntr += fields[i] + " = " + entries[i] + ",";
        }
        // pop off last comma
        updatedEntr = updatedEntr.slice(0, -1);
        // construct sql query - UPDATE <table> SET <entry> WHERE ID = <card id>
        var query = "UPDATE " + table + "SET " + updatedEntr + " WHERE ID = " + id;

        var result = this.connection.query(query, function(error, results, fields) {
            if (error) throw error;
            return results;
        });
        return result;
    }

}

module.exports = SQLController;
