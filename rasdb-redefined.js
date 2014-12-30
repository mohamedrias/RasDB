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
	if(results && {}.prototype.toString.call(results)==="[object Array]") {
		this.results = results;
	} else {
		this.results = RasDB.prototype.OBJECTSTORE[databaseName][collectionName].slice(0);
	}

}

Collection.prototype = {
	$R : function(results) {
		return new Collection(this.database, this.collectionName, results);
	},
	insert : function(object) {
		if(object && typeof object =="object") {
			RasDB.prototype.OBJECTSTORE[this.database][this.collectionName].push(object);
			this.results.push(object);
		}
		return this;
	},
	dump : function(array, replace) {
		if({}.prototype.toString.call(array)==="[object Array]") {
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
	isArray : function(obj) {
		return Object.prototype.toString.call(obj)==="[object Array]";
	}
}
