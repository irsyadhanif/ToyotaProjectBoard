function addGreenCard() {
	var card = create("<div class=\"greenCard\"><h1 onclick=\"catchIt()\">Title</h1><p onclick=\"catchIt()\">description</p></div>")
	document.getElementById("greenCards").appendChild(card)
}
function addYellowCard() {
	var card = create("<div class=\"yellowCard\"><h1 onclick=\"catchIt()\">Title</h1><p onclick=\"catchIt()\">description</p></div>")
	document.getElementById("yellowCards").appendChild(card)
}
function addRedCard() {
	var card = create("<div class=\"redCard\"><h1 onclick=\"catchIt()\">Title</h1><p onclick=\"catchIt()\">description</p></div>")
	document.getElementById("redCards").appendChild(card)
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
	} else {
		var y = document.createElement('P');
	}
	var z = area.parentNode;
	y.innerHTML = area.value;
	z.insertBefore(y,area);
	z.removeChild(area);
	z.removeChild(butt);
	editing = false;
}