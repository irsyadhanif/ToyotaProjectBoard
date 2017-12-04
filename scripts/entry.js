
function Entry(table) {
    this.table = table;
    this.fields = [];
    this.entries = [];
}

Entry.prototype.addEntry = function(field, entry) {
    this.fields.push(field);
    this.entries.push('\'' + entry + '\'');
};

Entry.prototype.getFields = function() {
    return this.fields;
};

Entry.prototype.getEntries = function() {
    return this.entries;
};

Entry.prototype.getTable = function() {
    return this.table;
};

module.exports = Entry;
