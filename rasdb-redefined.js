/**
 * User: Rias
 * Date: 12/29/14
 * Time: 11:00 AM
 * Description : Description will be here
 * File name : rasdb-redefined
 */

function RasDB(namespace) {
	this.namespace = namespace;
	RasDB.prototype.OBJECTSTORE[namespace] = RasDB.prototype.OBJECTSTORE[namespace] || {};
	return this;
}
RasDB.prototype = {
	OBJECTSTORE : {},
	collection : function(collectionName) {
		return new Collection(this.namespace, collectionName);
	}
}
function Collection(databaseName, collectionName, results) {
	this.collectionName = collectionName;
	this.database = databaseName;
	RasDB.prototype.OBJECTSTORE[databaseName][collectionName] = RasDB.prototype.OBJECTSTORE[databaseName][collectionName] || [];
	if(results && this.prototype.isArray(results)) {
		this.results = results;
	} else {
		this.results = RasDB.prototype.OBJECTSTORE[databaseName][collectionName].slice(0);
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
			RasDB.prototype.OBJECTSTORE[this.database][this.collectionName].push(object);
			this.results.push(object);
		}
		if(this.isArray(object)) {
			RasDB.prototype.OBJECTSTORE[this.database][this.collectionName].concat(object);
			this.results.concat(object);
		}
		return this;
	},
	dump : function(array, replace) {
		if(this.isArray(array)) {
			if(replace) {
				RasDB.prototype.OBJECTSTORE[this.database][this.collectionName] = array;
			} else {
				RasDB.prototype.OBJECTSTORE[this.database][this.collectionName] = RasDB.prototype.OBJECTSTORE[this.database][this.collectionName].concat(array);
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
	}
}
