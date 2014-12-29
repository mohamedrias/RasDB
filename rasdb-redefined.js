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
function Collection(databaseName, collectionName) {
	this.collectionName = collectionName;
	this.database = databaseName;
	RasDB.prototype.OBJECTSTORE[databaseName][collectionName] = RasDB.prototype.OBJECTSTORE[databaseName][collectionName] || [];
	this.objects = RasDB.prototype.OBJECTSTORE[databaseName][collectionName].slice(0);
}

Collection.prototype = {
	insert : function(object) {
		if(object && typeof object =="object") {
			RasDB.prototype.OBJECTSTORE[this.database][this.collectionName].push(object);
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
	}
}
