class CardObject {

	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.description = "";
		this.comments = ["test comment 1", "test comment 2", "test comment 3"];
	}

	get id() { return this._id; }
	get title() { return this._title; }
	get description() { return this.description; }
	get comments() { return this._comments;	}

	set id(newId) { this._id = newId; }
	set title(newTitle) { this._title = newTitle; }
	set description(newDescription) { this.description = newDescription; }
	set comments(newComments) { this._comments = newComments; }

	function addComment(comment) {
		this._comments.push(comment);
	}

	function deleteComment(id) {
		this._comments.splice(id, 1);
	}
}
