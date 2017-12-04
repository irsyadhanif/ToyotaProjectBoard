var imported = document.createElement('script');
imported.src = 'http://localhost:3000/socket.io/socket.io.js';
document.head.appendChild(imported);




//Used for testing purposes only
var loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var cardId = 1;
var commentId = 1;
var enlargeCardId;
var enlargeCardType;
var cardDragId;
var cardObjects = [];

function color ($colr) {
	//var socket = io('http://localhost:3000');
	//socket.emit('color', $colr);
};

function updateCommentId() {
	var socket = io('http://localhost:3000');
	socket.emit('commentID', "funfun");
	socket.on('commentId', function(id) {
		setTimeout (function() {
			commentId = parseInt(id);
		}, (100));
	});
}

function loadSQL() {
	var socket = io('http://localhost:3000');
	socket.on('sql', function(data) {
		var cards = JSON.parse(data);
		updateCommentId();
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].COLOR == 'red')
				addRedCard(cards[i]);
			else if (cards[i].COLOR == 'yellow')
				addYellowCard(cards[i]);
			else
				addGreenCard(cards[i]);
		}
	});
};

function sendSQL(action, table, id, colName, value) {
	var socket = io('http://localhost:3000');
	var data = {'action':action, 'table':table, 'id':id, 'col':colName, 'value':value};
	socket.emit('sqlUpdate', JSON.stringify(data));
	socket.on('cardId', function(id) {
		setTimeout (function() {
			cardId = parseInt(id);
			return;
		},(100));
	});
};

function addCard(color) {
	sendSQL('insert', 'card', color);
	setTimeout( function() {
		if (color == 'red')
			addRedCard();
		else if (color == 'yellow')
			addYellowCard();
		else
			addGreenCard();
	}, (400));
}

function getCardObjectById(id) {
	var arrayLength = cardObjects.length;
	for (var i = 0; i < arrayLength; i++) {
	    if (cardObjects[i].id == id) {
	    	return cardObjects[i];
	    }
	}
}

function addGreenCard(data) {
	//color('green');
	var title="",desc="",id=cardId,comms=[];
	if (data === undefined) {
		title = 'Title';
		desc = "Add A Description";
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 1"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 2"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 3"});
	} else {
		title = data.TITLE;
		desc = data.DESCRIPTION;
		id = data.ID;
		if (data.COMMENTS.length > 0)
			for (var i=0; i<data.COMMENTS.length; i++)
				comms.push(data.COMMENTS[i]);
	}
	var card = new CardObject(id, title);
	card.description = desc;
	card.comments = comms;
	cardObjects.push(card);
	var card = create("<div id=\""+id+"\" class=\"greenCard\" onclick=\"enlargeCard(\'green\',\'"+id+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">"+title+"</h1><p class=\"descriptionText\">"+desc+"</p></div>");
	document.getElementById("greenCards").appendChild(card);
}

function deleteGreenCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
	sendSQL('delete', 'card', idToDelete);
}

function addYellowCard(data) {
	//color('yellow');
	var title="",desc="",id=cardId,comms=[];
	if (data === undefined) {
		title = 'Title';
		desc = "Add A Description";
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 1"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 2"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 3"});
	} else {
		title = data.TITLE;
		desc = data.DESCRIPTION;
		id = data.ID;
		if (data.COMMENTS.length > 0)
			for (var i=0; i<data.COMMENTS.length; i++)
				comms.push(data.COMMENTS[i]);
	}
	var card = new CardObject(id, title);
	card.description = desc;
	card.comments = comms;
	cardObjects.push(card);
	var card = create("<div id=\""+id+"\" class=\"greenCard\" onclick=\"enlargeCard(\'green\',\'"+id+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">"+title+"</h1><p class=\"descriptionText\">"+desc+"</p></div>");
	document.getElementById("yellowCards").appendChild(card);
}

function deleteYellowCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
	sendSQL('delete', 'card', idToDelete);
}

function addRedCard(data) {
	//color('red');
	var title="",desc="",id=cardId,comms=[];
	if (data === undefined) {
		title = 'Title';
		desc = "Add A Description";
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 1"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 2"});
		commentId++;
		comms.push({'ID':commentId,'text':"Test Comment 3"});
	} else {
		title = data.TITLE;
		desc = data.DESCRIPTION;
		id = data.ID;
		if (data.COMMENTS.length > 0)
			for (var i=0; i<data.COMMENTS.length; i++)
				comms.push(data.COMMENTS[i]);
	}
	var card = new CardObject(id, title);
	card.description = desc;
	card.comments = comms;
	cardObjects.push(card);
	var card = create("<div id=\""+id+"\" class=\"greenCard\" onclick=\"enlargeCard(\'green\',\'"+id+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">"+title+"</h1><p class=\"descriptionText\">"+desc+"</p></div>");
	document.getElementById("redCards").appendChild(card);
}

function deleteRedCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
	sendSQL('delete', 'card', idToDelete);
}

function enlargeCard(type, id) {
	enlargeCardType = type;
	enlargeCardId = id;
	var card = getCardObjectById(enlargeCardId);
	var largeCard = create("<div id=\"fadedBackground\" onclick=\"minimizeCard()\"></div><div id=\"largeCard\"><h1 class=\"largeCardTitle\" onclick=\"catchIt()\">"+card.title+"</h1><p class=\"largeCardDescription\" onclick=\"catchIt()\">"+card.description+"</p><div id=\"commentSection\"><div id=\"comments\"></div><p id=\"addComment\" onclick=\"addComment()\">add comment</p></div><p class=\"deleteCard\" onclick=\"deleteCard()\">Delete Card</p></div>");
	document.getElementById("body").insertBefore(largeCard, document.getElementById("body").firstChild);
	var arrayLength = card.comments.length;
	for (var i = 0; i < arrayLength; i++) {
	    addCommentFromObject(card.comments[i].text, card.comments[i].ID);
	}
}

function minimizeCard() {
	document.getElementById("body").removeChild(document.getElementById("fadedBackground"));
	document.getElementById("body").removeChild(document.getElementById("largeCard"));
	editing = false;
}

function deleteCard() {
	document.getElementById("body").removeChild(document.getElementById("fadedBackground"));
	document.getElementById("body").removeChild(document.getElementById("largeCard"));
	if (enlargeCardType == "red") {
		deleteRedCard(enlargeCardId);
	} else if (enlargeCardType == "yellow") {
		deleteYellowCard(enlargeCardId);
	} else if (enlargeCardType == "green") {
		deleteGreenCard(enlargeCardId);
	}
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function addComment() {
	commentId++;
	var card = getCardObjectById(enlargeCardId);
	var comment = create("<div id=\"comment"+commentId+"\" class=\"comment\"><p class=\"deleteComment\" onclick=\"deleteComment("+commentId+")\">delete</p><p class=\"divider\">    |    </p><p class=\"commentText\" onclick=\"catchIt()\">enter text here</p></div>");
	document.getElementById("comments").appendChild(comment)
	console.log('BEFORE: ID="'+card.comments[card.comments.length-1].ID+'"    text="'+card.comments[card.comments.length-1].text+'"');
	card.addComment(commentId, "enter text here");//getCardObjectById(enlargeCardId).addComment(commentId, "enter text here");
	console.log('AFTER: ID="'+card.comments[card.comments.length-1].ID+'"    text="'+card.comments[card.comments.length-1].text+'"');
	sendSQL('insert','comment',card.id);
}

function addCommentFromObject(commentText, i) {
	var comment = create("<div id=\"comment"+i+"\" class=\"comment\"><p class=\"deleteComment\" onclick=\"deleteComment("+i+")\">delete</p><p class=\"divider\">    |    </p><p class=\"commentText\" onclick=\"catchIt()\">"+commentText+"</p></div>");
	document.getElementById("comments").appendChild(comment)
}

function deleteComment(id) {
	document.getElementById("comment"+id).remove();
	getCardObjectById(enlargeCardId).deleteComment(id);
	sendSQL('delete', 'comment', id);
}

function create(htmlStr) {
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    cardDragId = ev.target.id;
}

function drop(ev) {
    ev.preventDefault();
    var data = document.getElementById(cardDragId);
    var cards = ev.target.firstElementChild;
    cards.appendChild(data);
	//console.log('id='+cardDragId+'     color='+ev.target.id.toString().slice(0,-3));
	sendSQL('update','card',cardDragId,'COLOR',ev.target.id.toString().slice(0,-3));
}

var editing  = false;
var title = false;
var comment = false;
var butt;
var commentEditId;

if (document.getElementById && document.createElement) {
	butt = document.createElement('BUTTON');
	var buttext = document.createTextNode('save');
	butt.appendChild(buttext);
	butt.onclick = saveEdit;
}

function catchIt(e) {
	if (editing) {
		console.log("editing");
		return;
	}
	if (!document.getElementById || !document.createElement) {
		console.log("doc");
		return;
	}
	if (!e) var obj = window.event.srcElement;
	else var obj = e.target;
	while (obj.nodeType != 1) {
		obj = obj.parentNode;
	}
	if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
	if (obj.nodeName == 'H1') {
		title = true;
		while (obj.nodeName != 'H1' && obj.nodeName != 'HTML') {
			obj = obj.parentNode;
		}
	} else {
		title = false;
		while (obj.nodeName != 'P' && obj.nodeName != 'HTML') {
			obj = obj.parentNode;
		}
	}
	if (obj.nodeName == 'HTML') return;
	var x = obj.innerHTML;
	if (obj.className == "commentText") {
		comment = true;
		commentEditId = obj.parentElement.id.slice(7);
	} else {
		comment = false;
	}
	var y = document.createElement('TEXTAREA');
	var z = obj.parentNode;
	z.insertBefore(y,obj);
	z.insertBefore(butt,obj);
	z.removeChild(obj);
	y.value = x;
	y.focus();
	editing = true;
}

function saveEdit() {
	var area = document.getElementsByTagName('TEXTAREA')[0];
	var card = getCardObjectById(enlargeCardId);
	if (title) {
		var y = document.createElement('H1');
		y.className += " largeCardTitle";
		document.getElementById(enlargeCardId).getElementsByTagName("h1")[0].innerHTML = area.value;
		card.title = area.value;
		sendSQL('update','card',enlargeCardId,'TITLE',area.value);
	} else if (comment) {
		var y = document.createElement('P');
		y.className += "commentText";
		getCardObjectById(enlargeCardId).updateComment(commentEditId, area.value);
		sendSQL('update','comment',commentEditId,'text',area.value);
	} else {
		var y = document.createElement('P');
		y.className += " largeCardDescription"
		document.getElementById(enlargeCardId).getElementsByTagName("p")[0].innerHTML = area.value;
		card.description = area.value;
		sendSQL('update','card',enlargeCardId,'DESCRIPTION',area.value);
	}
	var z = area.parentNode;
	y.addEventListener("click", catchIt)
	y.innerHTML = area.value;
	z.insertBefore(y,area);
	z.removeChild(area);
	z.removeChild(butt);
	editing = false;
}

class CardObject {

	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.description = "";
		this.comments = [];
	}

	get id() { return this._id; }
	get title() { return this._title; }
	get description() { return this._description; }
	get comments() { return this._comments;	}

	set id(newId) { this._id = newId; }
	set title(newTitle) { this._title = newTitle; }
	set description(newDescription) { this._description = newDescription; }
	set comments(newComments) { this._comments = newComments; }

	addComment(id, comment) {
		var item = {'ID':id,'text':comment};
		this._comments.push(item);
	}

	deleteComment(id) {
		for (var i=0; i<this._comments.length; i++)
			if (this._comments[i].ID == id)
				this._comments.splice(i, 1);
	}

	updateComment(id, comment) {
		for (var i=0; i<this._comments.length; i++)
			if (this._comments[i].ID == id)
				this._comments[i].text = comment;
	}
}
