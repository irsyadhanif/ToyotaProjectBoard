"use strict";

class Entry {
    constructor (table) {
        this.table = table;
        this.fields = [];
        this.entries = [];
    }

    addEntry(field, entry) {
        this.fields.push(field);
        this.entries.push('\'' + entry + '\'');
    };

    getFields() {
        return this.fields;
    };

    getEntries() {
        return this.entries;
    };

    getTable() {
        return this.table;
    };
};

module.exports = Entry;
