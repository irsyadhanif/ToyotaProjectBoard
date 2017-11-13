//Used for testing purposes only
var loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var cardId = 1;
var enlargeCardId;
var enlargeCardType;
var cardDragId;
var cardObjects = [];

function getCardObjectById(id) {
	var arrayLength = cardObjects.length;
	for (var i = 0; i < arrayLength; i++) {
	    if (cardObjects[i].id == id) {
	    	return cardObjects[i];
	    }
	}
}

function addGreenCard() {
	cardId++;
	var card = new CardObject(cardId, "Title");
	card.description = loremText;
	cardObjects.push(card);
	console.log(cardObjects);
	var card = create("<div id=\""+cardId+"\" class=\"greenCard\" onclick=\"enlargeCard(\'green\',\'"+cardId+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>");
	document.getElementById("greenCards").appendChild(card);
}

function deleteGreenCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
}

function addYellowCard() {
	cardId++;
	var card = new CardObject(cardId, "Title");
	card.description = loremText;
	cardObjects.push(card);
	console.log(cardObjects);
	var card = create("<div id=\""+cardId+"\" class=\"yellowCard\" onclick=\"enlargeCard(\'yellow\',\'"+cardId+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>");
	document.getElementById("yellowCards").appendChild(card);
}

function deleteYellowCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
}

function addRedCard() {
	cardId++;
	var card = new CardObject(cardId, "Title");
	card.description = loremText;
	cardObjects.push(card);
	console.log(cardObjects);
	var card = create("<div id=\""+cardId+"\" class=\"redCard\" onclick=\"enlargeCard(\'red\',\'"+cardId+"\')\" draggable=\"true\" ondragstart=\"drag(event)\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>");
	document.getElementById("redCards").appendChild(card);
}

function deleteRedCard(idToDelete) {
	document.getElementById(""+idToDelete).remove();
}

function enlargeCard(type, id) {
	enlargeCardType = type;
	enlargeCardId = id;
	var card = getCardObjectById(enlargeCardId);
	var largeCard = create("<div id=\"fadedBackground\" onclick=\"minimizeCard()\"></div><div id=\"largeCard\"><h1 class=\"largeCardTitle\" onclick=\"catchIt()\">Title</h1><p class=\"largeCardDescription\" onclick=\"catchIt()\">"+loremText+"</p><div id=\"commentSection\"><div id=\"comments\"></div><p id=\"addComment\" onclick=\"addComment()\">add comment</p></div><p class=\"deleteCard\" onclick=\"deleteCard()\">Delete Card</p></div>");
	document.getElementById("body").insertBefore(largeCard, document.getElementById("body").firstChild);
	var arrayLength = card.comments.length;
	for (var i = 0; i < arrayLength; i++) {
	    addCommentFromObject(card.comments[i], i);
	}
}

function minimizeCard() {
	document.getElementById("body").removeChild(document.getElementById("fadedBackground"));
	document.getElementById("body").removeChild(document.getElementById("largeCard"));
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
	var commentId = getCardObjectById(enlargeCardId).comments.length + 1;
	var comment = create("<div id=\"comment"+commentId+"\" class=\"comment\"><p class=\"deleteComment\" onclick=\"deleteComment("+commentId+")\">delete</p><p class=\"divider\">    |    </p><p class=\"commentText\" onclick=\"catchIt()\">enter text here</p></div>");
	document.getElementById("comments").appendChild(comment)
	getCardObjectById(enlargeCardId).addComment("enter text here");
}

function addCommentFromObject(commentText, i) {
	var comment = create("<div id=\"comment"+i+"\" class=\"comment\"><p class=\"deleteComment\" onclick=\"deleteComment("+i+")\">delete</p><p class=\"divider\">    |    </p><p class=\"commentText\" onclick=\"catchIt()\">"+commentText+"</p></div>");
	document.getElementById("comments").appendChild(comment)
}

function deleteComment(id) {
	document.getElementById("comment"+id).remove();
	getCardObjectById(enlargeCardId).deleteComment(id);
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
	if (title) {
		var y = document.createElement('H1');
		y.className += " largeCardTitle";
		document.getElementById(enlargeCardId).getElementsByTagName("h1")[0].innerHTML = area.value;
	} else if (comment) {
		var y = document.createElement('P');
		y.className += "commentText";
		getCardObjectById(enlargeCardId).updateComment(area.value, commentEditId);
	} else {
		var y = document.createElement('P');
		y.className += " largeCardDescription"
		document.getElementById(enlargeCardId).getElementsByTagName("p")[0].innerHTML = area.value;
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
		this.comments = ["test comment 1", "test comment 2", "test comment 3"];
	}

	get id() { return this._id; }
	get title() { return this._title; }
	get description() { return this._description; }
	get comments() { return this._comments;	}

	set id(newId) { this._id = newId; }
	set title(newTitle) { this._title = newTitle; }
	set description(newDescription) { this._description = newDescription; }
	set comments(newComments) { this._comments = newComments; }

	addComment(comment) {
		this._comments.push(comment);
	}

	updateComment(comment, i) {
		this._comments[i] = comment;
	}

	// TODO: Fix deletion bug
	deleteComment(id) {
		this._comments.splice(id, 1);
	}
}