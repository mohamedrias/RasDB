(function() {
"use strict";
/**
 * User: Rias
 * Date: 12/29/14
 * Time: 11:00 AM
 * Description : Description will be here
 * File name : rasdb-redefined
 */

/**
 * Private Object Store accessible only for RasDB
 * @type {{}}
 */
var OBJECTSTORE = {};
/**
 * RasDB Constructore function: creates a namespace for the DB in objectstore
 * @param namespace
 * @returns DB Object
 */
window.RasDB = function(namespace) {
	this.namespace = namespace;
	OBJECTSTORE[namespace] = OBJECTSTORE[namespace] || {};
	return this;
}
	/**
	 * Prototype Chain for RASDB object.
	 * @description Exposes objectstore and collection API
	 * @type {{OBJECTSTORE: {}, collection: Function}}
	 */
RasDB.prototype = {
	OBJECTSTORE : OBJECTSTORE,
	/**
	 * Used to
	 * @param collectionName
	 * @returns {Collection}
	 */
	collection : function(collectionName) {
		return new Collection(this.namespace, collectionName);
	}
}

	/**
	 * Collection Constructore Function: Used to create new collection & Get existing collection
	 * @param databaseName
	 * @param collectionName
	 * @param results
	 * @constructor
	 */
	window.Collection = function(databaseName, collectionName, results) {
	this.collectionName = collectionName;
	this.database = databaseName;
	OBJECTSTORE[databaseName][collectionName] = OBJECTSTORE[databaseName][collectionName] || [];
	if(results && Collection.prototype.isArray(results)) {
		this.results = results;
	} else {
		this.results = Collection.prototype.getAll();
	}

}

	/**
	 * Prototype chain on Collection to do basic CRUD operations
	 * @type {{$R: Function, isArray: Function, isObject: Function, insert: Function, dump: Function, getAll: Function, get: Function, find: Function, findBy: Function, first: Function, last: Function, limit: Function, skip: Function, range: Function, sort: Function, exec: Function, paginate: Function}}
	 */
Collection.prototype = {
	/**
	 * Function used to create new collection object for internal results purpose
	 * @param results
	 * @returns {Collection}
	 */
	$R : function(results) {
		return results ? new Collection(this.database, this.collectionName, results) : new Collection(this.database, this.collectionName) ;
	},

	/**
	 * Checks whether a given object is Array or not
	 * @param object
	 * @returns {boolean}
	 */
	isArray : function(object) {
		return Object.prototype.toString.call(object)==="[object Array]";
	},

	/**
	 * Check if a given object is really an object || null
	 * @param object
	 * @returns {*|boolean}
	 */
	isObject : function(object) {
		return object && typeof object =="object"
	},

	/**
	 * Function used to insert object into the objectstore. Checks whether the input is an object/array.
	 * @param object
	 * @returns {*}
	 */
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

	/**
	 * Function used to dump an array of objects into the Objectstore.
	 * @param array
	 * @param replace : Boolean flag used to specify whether to replace the ObjectStore / append to the ObjectStore
	 * @returns {*}
	 */
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

	/**
	 * Function returns the Collection array
	 * @returns {*} : Returns the collection results arrays
	 */
	getAll: function() {
		return OBJECTSTORE[this.database][this.collectionName].slice(0);
	},

	/**
	 * Function used to get the results from objectstore either based on index
	 * @param param: Optional input. Used to get object from specific index
	 * @returns {*}
	 */
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

	/**
	 * Used to find by a particular property
	 * @param property
	 * @param value
	 * @returns {Collection}
	 */
	findBy : function(property, value){
		return this.$R(this.results.filter(function(obj) {
				return (obj[property]==value);
			}));
	},
	/**
	 * Function to get the first position object
	 * @returns {Collection}
	 */
	first: function() {
		return this.$R(this.get()[0]);
	},
	/**
	 * Used to return the last element from the objectstore
	 * @returns {Collection}
	 */
	last: function() {
		return this.$R([this.results[this.results.length-1]]);
	},
	/**
	 * Used to limit the number of results
	 * @param param
	 * @returns {Collection}
	 */
	limit : function(param) {
		return this.$R(param ? this.results.slice(0,param) : this.results);
	},
	/**
	 * Used to skip particular element from the array
	 * @param param
	 * @returns {Collection}
	 */
	skip: function(param) {
		return this.$R(this.results.slice(param));
	},
	/**
	 * Used to cherry pick particular range of elements from the objectstore
	 * @param from
	 * @param to
	 * @returns {Collection}
	 */
	range: function(from, to) {
		return this.$R(this.results.slice(from,to));
	},
	/**
	 * Used to sort the results via different parameters
	 * @param property to sort the array. use "-" as prefix if reverse sorting is required
	 * @returns {Collection}
	 */
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
	/**
	 * Gives control the user after the query has executed.
	 * @param callback
	 * @returns {*}
	 */
	exec : function(callback) {
		if(callback && typeof callback =="function") {
			return callback.apply(this, this.get());
		}
	},
	/**
	 * Provides pagination functionality to the objectstore
	 * @param numberOfResults
	 * @returns {{next: Function, prev: Function}}
	 */
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