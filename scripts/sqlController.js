var mysql = require('mysql');
var async = require('async');
var card = require('./card.js');

function SQLController(host, username, password, database) {
		this.cards = [];
		this.cardCols = ['ID','TITLE','DESCRIPTION','COLOR'];
		this.commentCols = ['ID','CardID','TEXT'];

        this.connection = mysql.createConnection({
            host:     host,
            user:     username,
            password: password,
            database: database
        });
        this.connection.connect((err) => {
			if (err) {
				console.log('Error connecting to DB');
				return;
			}
			console.log('Connected!');
		});
}

SQLController.prototype.endConnection = function() {
        this.connection.end((err) => {
			if (err) {
				console.log('Error disconnecting from DB');
				return;
			}
			console.log('Disconnected!');
		});
};

SQLController.prototype.SQLsleep = function (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
}

SQLController.prototype.SQLInsert = function(entry) {
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

};


SQLController.prototype.SQLSelect = function(table) {
        var query = "SELECT * from " + table + ";";
        this.connection.query(query, (err,rows) => {
			if(err) throw err;
			console.log('Data received from Db:\n');
		
			this.cards = row;
		  	//rows.forEach( (row) => { 
			//	this.cards.push(row);
		  	//	//console.log(`${row.TITLE} is in \"${row.DESCRIPTION}\"`); 
		  	//});

			//console.log(this.cards);
			return this.cards;
			//this.cards = [];
			//async.each(rows, function(row, callback) {
			//	this.cards.push(row);
			//	callback();
			//}, function(err) {
			//	if (err) throw err;
			//	this.SQLsleep(100);
			//	return this.cards;
			//});

			//console.log(rows[0].TITLE);
			//\return this.cards[0].TITLE;
		});

		//var result = this.connection.query(query, function (error, results, fields) {
        //    if (error) throw error;
        //    return results;
        //});
        //console.log(result);
        //return cards; // result;
};

SQLController.prototype.getCards = function() {
		return this.cards;
};

SQLController.prototype.SQLDelete = function(card) {
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
};

SQLController.prototype.SQLEdit = function(card, entry) {
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
};





module.exports = SQLController;
