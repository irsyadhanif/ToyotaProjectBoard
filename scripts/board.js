//Used for testing purposes only
var loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var cardId = 1;
var enlargeCardId;
var enlargeCardType;

function addGreenCard() {
	cardId++;
	var card = create("<div id=\""+cardId+"\" class=\"greenCard\" onclick=\"enlargeCard(\'green\',\'"+cardId+"\')\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>")
	document.getElementById("greenCards").appendChild(card)
}

function deleteGreenCard(idToDelete) {
	document.getElementById("greenCards").removeChild(document.getElementById(""+idToDelete))
}

function addYellowCard() {
	cardId++;
	var card = create("<div id=\""+cardId+"\" class=\"yellowCard\" onclick=\"enlargeCard(\'yellow\',\'"+cardId+"\')\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>")
	document.getElementById("yellowCards").appendChild(card)
}

function deleteYellowCard(idToDelete) {
	document.getElementById("yellowCards").removeChild(document.getElementById(""+idToDelete))
}

function addRedCard() {
	cardId++;
	var card = create("<div id=\""+cardId+"\" class=\"redCard\" onclick=\"enlargeCard(\'red\',\'"+cardId+"\')\"><h1 class=\"titleText\">Title</h1><p class=\"descriptionText\">"+loremText+"</p></div>")
	document.getElementById("redCards").appendChild(card)
}

function deleteRedCard(idToDelete) {
	document.getElementById("redCards").removeChild(document.getElementById(""+idToDelete))
}

function enlargeCard(type, id) {
	enlargeCardType = type
	enlargeCardId = id
	var largeCard = create("<div id=\"fadedBackground\" onclick=\"minimizeCard()\"></div><div id=\"largeCard\"><h1 class=\"largeCardTitle\" onclick=\"catchIt()\">Title</h1><p class=\"largeCardDescription\" onclick\"catchIt()\">"+loremText+"</p><p class=\"deleteCard\" onclick=\"deleteCard()\">Delete Card</p></div>")
	document.getElementById("body").insertBefore(largeCard, document.getElementById("body").firstChild)
}

function minimizeCard() {
	document.getElementById("body").removeChild(document.getElementById("fadedBackground"))
	document.getElementById("body").removeChild(document.getElementById("largeCard"))
}

function deleteCard() {
	document.getElementById("body").removeChild(document.getElementById("fadedBackground"))
	document.getElementById("body").removeChild(document.getElementById("largeCard"))
	if (enlargeCardType == "red") {
		deleteRedCard(enlargeCardId)
	} else if (enlargeCardType == "yellow") {
		deleteYellowCard(enlargeCardId)
	} else if (enlargeCardType == "green") {
		deleteGreenCard(enlargeCardId)
	}
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

var editing  = false;
var title = false;
var butt;

if (document.getElementById && document.createElement) {
	butt = document.createElement('BUTTON');
	var buttext = document.createTextNode('Ready!');
	butt.appendChild(buttext);
	butt.onclick = saveEdit;
}

function catchIt(e) {
	if (editing) return;
	if (!document.getElementById || !document.createElement) return;
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
	} else {
		var y = document.createElement('P');
		y.className += " largeCardDescription"
		document.getElementById(enlargeCardId).getElementsByTagName("p")[0].innerHTML = area.value;
	}
	var z = area.parentNode;
	y.innerHTML = area.value;
	z.insertBefore(y,area);
	z.removeChild(area);
	z.removeChild(butt);
	editing = false;
}