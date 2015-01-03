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
	find : function(object, callback){
		if(typeof object ==="undefined") {
			return this;
		};
		var keys = Object.keys(object);
		if(arguments.length==1) {
			return this.$R(this.results.filter(function(obj) {
				return keys.reduce(function(matching, key) {
					if(obj[key]!=object[key]) matching = false;
					return matching;
				}, true);
			}));
		} else if(arguments.length>1) {
			return callback.call(this, this.results.filter(function(obj) {
				return keys.reduce(function(matching, key) {
					if(obj[key]!=object[key]) matching = false;
					return matching;
				}, true);
			}));
		}
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
	},
	limit : function(param) {
		return this.$R(param ? this.results.slice(0,param) : this.results);
	},

	skip: function(param) {
		return this.$R(this.results.slice(param));
	},

	range: function(from, to) {
		return this.$R(this.results.slice(from,to));
	},
	sort: function(property) {
		property = property ? property : "id";
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		var array = this.results.slice(0);
		return this.$R(array.sort(function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}));
	},

	exec : function(callback) {
		if(callback && typeof callback =="function") {
			return callback.apply(this, this.get());
		}
	},

	paginate: function(numberOfResults) {
		var numberOfResults = numberOfResults || 10,
			from = 0,
			to = 0,
			results = this.$R(this.results),
			self =  this;
		return {
			next : function () {
				if(to === results.results.length) return results.range(from,to).get();
				from = to;
				to = (to + numberOfResults) > results.results.length ? (results.results.length -1) : (to + numberOfResults);
				if(to <= results.results.length)	return results.range(from,to).get();
			},
			prev : function() {
				to = from;
				from = ((from - numberOfResults) < 0) ? 0 : (from - numberOfResults);
				to = (to <= 0) ? numberOfResults : to;
				return results.range(from, to).get();
			}
		}
	}
}
})();