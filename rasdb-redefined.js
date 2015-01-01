(function() {
"use strict";
/**
 * User: Rias
 * Date: 12/29/14
 * Time: 11:00 AM
 * Description : Description will be here
 * File name : rasdb-redefined
 */
var OBJECTSTORE = {};

window.RasDB = function(namespace) {
	this.namespace = namespace;
	OBJECTSTORE[namespace] = OBJECTSTORE[namespace] || {};
	return this;
}
RasDB.prototype = {
	OBJECTSTORE : OBJECTSTORE,
	collection : function(collectionName) {
		return new Collection(this.namespace, collectionName);
	}
}
window.Collection = function(databaseName, collectionName, results) {
	this.collectionName = collectionName;
	this.database = databaseName;
	OBJECTSTORE[databaseName][collectionName] = OBJECTSTORE[databaseName][collectionName] || [];
	if(results && Collection.prototype.isArray(results)) {
		this.results = results;
	} else {
		this.results = OBJECTSTORE[databaseName][collectionName].slice(0);
	}

}

Collection.prototype = {
	$R : function(results) {
		return results ? new Collection(this.database, this.collectionName, results) : new Collection(this.database, this.collectionName) ;
	},
	isArray : function(obj) {
		return Object.prototype.toString.call(obj)==="[object Array]";
	},
	isObject : function(object) {
		return object && typeof object =="object"
	},
	insert : function(object) {
		if(this.isObject(object)) {
			OBJECTSTORE[this.database][this.collectionName].push(object);
			this.results.push(object);
		}
		if(this.isArray(object)) {
			OBJECTSTORE[this.database][this.collectionName].concat(object);
			this.results.concat(object);
		}
		return this;
	},
	dump : function(array, replace) {
		if(this.isArray(array)) {
			if(replace) {
				OBJECTSTORE[this.database][this.collectionName] = array;
				this.results = array.slice(0);
			} else {
				OBJECTSTORE[this.database][this.collectionName] = OBJECTSTORE[this.database][this.collectionName].concat(array);
				this.results = OBJECTSTORE[this.database][this.collectionName].slice(0);
			}
		}
		return this;
	},

	getAll: function() {
		return this.results;
	},

	get : function(param){
		var self = this;
		if(typeof param == "number") {
			if(param < this.results.length) return this.results[param];
			else {
				console.warn("Sorry, index out of bound");
				return;
			}
		}
		return this.results;
	},
	/*
	 Used to match multiple properties of an object.
	 If all the properties match, return the objects list
	 */
	find : function(object){
		if(typeof object ==="undefined") {
			return this;
		};
		var keys = Object.keys(object);
		return this.$R(this.results.filter(function(obj) {
			return keys.reduce(function(matching, key) {
				if(obj[key]!=object[key]) matching = false;
				return matching;
			}, true);
		}));
	},

	findBy : function(property, value){
		return this.$R(this.results.filter(function(obj) {
				return (obj[property]==value);
			}));
	},
	first: function() {
		return this.$R(this.get()[0]);
	},
	last: function() {
		return this.$R([this.results[this.results.length-1]]);
	}
}
})();