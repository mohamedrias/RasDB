(function(window, document, LS) {
	/*
		Constructor function to initialize the RAS DB object.
	 */
	window.RasDB = function(configObject) {
		if(!(this instanceof RasDB)) {
			return new RasDB(configObject);
		}
		if({}.toString.call(configObject)=="[object Array]") {
			this.OBJECTSTORE = configObject;
			return this;
		}
		this.configObject = configObject;
		this.OBJECTSTORE = [];
		this.CacheStore = {};
		this.namespace = this.configObject && this.configObject.namespace;
		//TODO: Get localstorage namespace from configObject
		if(this.namespace) {
			this.OBJECTSTORE = this.readFromLS();
		}
//		this.cache = configObject.cache || false;
//		this.index = configObject.index || false;
//		return this;
	}


	RasDB.prototype = {

		/*
			method: dump
			params: data - Which can be an array, url or object.
			return object;
		 */
		dump : function(data) {
			var self = this;
			if(data && typeof data==="string") {
				//TODO: Add ajax functionality to fetch from endpoint and populate
				//TODO: Implement promise to have callback available.
			}
			if(data && typeof data === "object" && Object.prototype.toString.call(data) === "[object Array]") {
				if(this.cache) {
					data.map(function(obj) {
						self.CacheStore[obj[self.index]] = obj;
					})
				}
				this.OBJECTSTORE = data;
			}
			if(data && typeof data === "object" && Object.prototype.toString.call(data) === "[object Object]") {
				this.add(data);
			}
			this.writeToLS();
			return this;
		},
		add : function(object) {
			this.OBJECTSTORE.push(object);
			this.writeToLS();
			return this;
		},

		//TODO: Need to update logic for delete functionality
		delete : function(query) {
			var self = this;
			var matches = this.find(query);
			console.log("matches "+matches);
			if(this.isArray(matches)) {
				matches.map(function(obj) {
					return delete obj;
				})
			}
			else {
				self.OBJECTSTORE.splice(self.OBJECTSTORE.indexOf(matches),1);
			}
		},
		isArray : function(obj) {
			return Object.prototype.toString.call(obj)==="[object Array]";
		},
		update : function(query, object){
			return this.find(query)[0]=object;
		},

		getAll : function(){
			return this.OBJECTSTORE;
		},

		/*
			Used to match multiple properties of an object.
			If all the properties match, return the objects list
		 */
		find : function(object){
			var keys = Object.keys(object);
			return this.OBJECTSTORE.filter(function(obj) {
				return keys.reduce(function(matching, key) {
					if(obj[key]!=object[key]) matching = false;
					return matching;
				}, true);
			})
		},

		/*
		 Used to match multiple properties of an object.
		 If all the properties match, return the objects list
		 */
		//TODO: Need to check the logic still
		findOr : function(object){
			var keys = Object.keys(object);
			return this.OBJECTSTORE.reduce(function(array, obj) {
				keys.map(function(key) {
					if(obj[key]==object[key]) {
						if(array.indexOf(obj)==-1) array.push(obj);
					}
				});
				return array;
			}, [])
		},

		/*
		//TODO: Logic to fix find by single property & value
		findBy : function(property, value){
			return this.OBJECTSTORE.filter(function(obj) {
				return (obj[property]==value);
			})
		},

		*/
		findById : function(id){
			return this.OBJECTSTORE.reduce(function(obj) {
				if(obj.id==id) return obj;
			})
		},
		index : function(property) {
			this.index = property;
		},
		cache: function() {
			var self = this;
			this.OBJECTSTORE.map(function(obj) {
				this.CacheStore[obj[self.index]] = obj;
			})
		},

		limit : function(param) {
			return this.OBJECTSTORE.slice(0,param);
		},

		skip: function(param) {
			return this.OBJECTSTORE.slice(param);
		},

		range: function(from, to) {
			return this.OBJECTSTORE.slice(from,to);
		},

		writeToLS : function() {
			localStorage[this.namespace] = JSON.stringify(this.OBJECTSTORE);
		},

		readFromLS : function() {
			return localStorage[this.namespace]? JSON.parse(localStorage[this.namespace]) : [];
		}


	}
})(window, document, localStorage);
