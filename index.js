var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var async = require('async');
var card = require('./scripts/card.js');
//var SQLController = require('./scripts/sqlController.js');

var host = 'localhost';
var username = 'logan';
var password = 'toyota';
var database = 'toyota';

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	//socket.emit('message', 'You are connected IO!');
	var sql = new SQLController(host, username, password, database);
	sql.SQLSelect('card');
	setTimeout(function() {
		//var ca =JSON.stringify(sql.cards);
		//socket.emit('sql', ca);
	}, (100));
	sql.SQLSelect('comment');
	setTimeout(function() {
		//var co =JSON.stringify(sql.comments);
		sql.cards = combineData(sql.cards, sql.comments);
		var ca = JSON.stringify(sql.cards);
		socket.emit('sql', ca);
	}, (100));

	socket.on('color', function (msg) {
		console.log('Color: ' + msg);
	});

	socket.on('commentID', function(text) {
		var cols = sql.commentCols.toString();
		var con = sql.connection;
		var id = 1;
		var query = "";
		setTimeout( function() {
			query = "INSERT INTO comment";
			query += " (" + cols + ") VALUES";
			query += " (" + id + ", 'enter text here');";

			con.query(query, (err) => {
				if (err) throw err;
			});
		}, (100));
		setTimeout( function() { 
			query = "SELECT MAX(ID) as id FROM comment;";
			con.query(query, (err,row) => {
				if (err) throw err;
				id = row[0].id;
				io.emit('commentId', id);
			});
		},(200));
		setTimeout( function() {
			query = "DELETE FROM comment WHERE ID=" + id + ";";
			con.query(query, (err) => {
				if (err) throw err;
			});
		}, (300));
	});

	socket.on('sqlUpdate', function(info) {
		var data = JSON.parse(info);

		if (data.table == 'card') {
			if (data.action == 'insert') {
				var id = sql.SQLInsert(data.table, data.id);
				//console.log('id = '+id);
				socket.emit('cardId', id);
			} else if (data.action == 'update') {
				sql.SQLEdit(data.table, data.id, data.col, data.value);
			} else {	// data.action == 'delete'
				sql.SQLDelete(data.table, data.id);
			}
		} else {	// data.table == 'comment'
			if (data.action == 'insert') {
				sql.SQLInsert(data.table, data.id);
			} else if (data.action == 'update') {
				sql.SQLEdit(data.table, data.id, data.col, data.value);
			} else {	// data.action == 'delete'
				sql.SQLDelete(data.table, data.id);
			}
		}
	});
	
	//socket.on('disconnect', function() {
	//	console.log('user disconnected');
	//});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});




function combineData(cards, comments) {
	for (var i = 0; i < cards.length; i++) {
		var currComms = [];
		for (var j = 0; j < comments.length; j++) {
			if (comments[j].CardID == cards[i].ID) {
				currComms.push({'ID':comments[j].ID,'text':comments[j].text});
			}
		}
		cards[i].COMMENTS = currComms;
	}
	return cards;
}

function SQLController(host, username, password, database) {
		this.cards = [];
		this.comments = [];
		this.cardCols = ['TITLE','DESCRIPTION','COLOR'];
		this.commentCols = ['CardID','text'];

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
			console.log('DB Connected!');
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

SQLController.prototype.SQLInsert = function(table, id) {
		var query = "";
		var count;
		if (table == 'card') {
			query = "INSERT INTO " + table;
			query += " (" + this.cardCols.toString() + ") VALUES";
			query += " ('Title', 'Add A Description', '" + id + "');";
			this.connection.query(query, (err) => {
				if (err) throw err;
			});
			
			this.connection.query("SELECT * FROM card WHERE TITLE='Title' AND DESCRIPTION='Add A Description' AND COLOR='"+id+"';", (err, rows) => {
				if (err) throw err;
				id = rows[rows.length - 1].ID;
			});
		}

		var cols = this.commentCols.toString();
		var con = this.connection;
		setTimeout( function() {
			query = "INSERT INTO comment";
			query += " (" + cols + ") VALUES";
			if (table == 'card') {
				query += " (" + id + ", 'Test Comment 1'),";
				query += " (" + id + ", 'Test Comment 2'),";
				query += " (" + id + ", 'Test Comment 3');";
			} else
				query += " (" + id + ", 'enter text here');";

			con.query(query, (err) => {
				if (err) throw err;
			});
		}, (100));
		setTimeout( function() { 
			io.emit('cardId', id);
			return id
		},(100));
};


SQLController.prototype.SQLSelect = function(table) {
        var query = "SELECT * from " + table + ";";
        this.connection.query(query, (err,rows) => {
			if(err) throw err;
			//console.log('Data received from Db:\n');
		
		  	rows.forEach( (row) => { 
				if (table == 'card')
					this.cards.push(row);
				else
					this.comments.push(row);
		  	});
			return;
		});
};

SQLController.prototype.SQLDelete = function(table, id) {
		var query = "DELETE FROM " + table + " WHERE ID=" + id + ";";
		this.connection.query(query, (err) => {
			if (err) throw err;
		});
		if (table == 'card') {
			query = "DELETE FROM comment WHERE CardID=" + id + ";";
			this.connection.query(query, (err) => {
				if (err) throw err;
			});
		}
		return;
};

SQLController.prototype.SQLEdit = function(table, id, col, val) {
		var query = 'UPDATE ' + table + ' SET ';
		query += col + '="' + val + '" WHERE ID=' + id + ';';
		this.connection.query(query, (err) => {
			if (err) throw err;
		});
		return;

        //// get card info - id
        //var table   = card.getTable();
        //var id      = card.getID();
        //var entries = entry.getEntries();
        //var fields  = entry.getFields();
        //// entry represents the entries that will be updated
        //var updatedEntr = "";
        //for (i = 0; i < entries.length; i++) {
        //    updatedEntr += fields[i] + " = " + entries[i] + ",";
        //}
        //// pop off last comma
        //updatedEntr = updatedEntr.slice(0, -1);
        //// construct sql query - UPDATE <table> SET <entry> WHERE ID = <card id>
        //var query = "UPDATE " + table + "SET " + updatedEntr + " WHERE ID = " + id;

        //var result = this.connection.query(query, function(error, results, fields) {
        //    if (error) throw error;
        //    return results;
        //});
        //return result;
};

module.exports = SQLController;
