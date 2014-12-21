(function(window, document, LS) {
	/*
		Constructor function to initialize the RAS DB object.
	 */
	window.RasDB = function(configObject) {
		if(!(this instanceof RasDB)) {
			return new RasDB(configObject);
		}
		this.results = [];
		this.flag = false;
		if({}.toString.call(configObject)=="[object Array]") {
			this.OBJECTSTORE = configObject;
			return this;
		}
		if(configObject instanceof RasDB) return configObject;
		this.configObject = configObject;
		this.OBJECTSTORE = [];
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

		$R : function(array) {
			this.results = array;
		},
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
			this.flag = false;
			this.OBJECTSTORE.push(object);
			this.writeToLS();
			return this;
		},

		//TODO: Need to update logic for delete functionality
		delete : function(query) {
			this.flag = false;
			var self = this;
			if(typeof query ==="undefined") {
				delete this.OBJECTSTORE;
			}
			else if (typeof query === "object") {
				var matches = this.find(query).get();
				if(this.isArray(matches)) {
					matches.map(function(obj) {
						return delete obj;
					})
				}
				else {
					self.OBJECTSTORE.splice(self.OBJECTSTORE.indexOf(matches[0]),1);
				}
			}
			else if(typeof query === "boolean") {
				console.log("inside boolean");
			}
		},
		isArray : function(obj) {
			return Object.prototype.toString.call(obj)==="[object Array]";
		},
		update : function(query, object){
			this.flag = false;
			this.find(query)[0]=object;
			return this;
		},

		getAll: function() {
			return this.OBJECTSTORE;
		},

		get : function(param){
			var self = this;
			if(typeof param == "number") {
				if(param < this.OBJECTSTORE.length && !this.flag) return this.OBJECTSTORE[param];
				if(param < this.results.length && this.flag) return this.results[param];
				else {
					console.warn("Sorry, index out of bound");
					return;
				}
			}
			setTimeout(function() {
				self.flag = false;
			}, 10);
			return (!this.flag ? this.OBJECTSTORE : this.results);
		},

		/*
			Used to match multiple properties of an object.
			If all the properties match, return the objects list
		 */
		find : function(object){
			if(typeof object ==="undefined") {
				this.flag = false;
				return this;
			};
			this.flag = true;
			var keys = Object.keys(object);
			this.$R(this.OBJECTSTORE.filter(function(obj) {
				return keys.reduce(function(matching, key) {
					if(obj[key]!=object[key]) matching = false;
					return matching;
				}, true);
			}));
			return this;
		},


		/*
		 Used to match multiple properties of an object.
		 If all the properties match, return the objects list
		 */
		//TODO: Need to check the logic still
		findOr : function(object){
			this.flag = true;
			var keys = Object.keys(object);
			this.$R(this.OBJECTSTORE.reduce(function(array, obj) {
				keys.map(function(key) {
					if(obj[key]==object[key]) {
						if(array.indexOf(obj)==-1) array.push(obj);
					}
				});
				return array;
			}, []));
			return this;
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
			var self = this;
			this.flag = true;
			this.$R(this.OBJECTSTORE.filter(function(obj) {
				if(obj.id==id) return obj;
			}));
			return this;
		},
		first: function() {
			this.flag = true;
			this.$R([this.OBJECTSTORE[0]]);
			return this;
		},
		last: function() {
			this.flag = true;
			this.$R([this.OBJECTSTORE[this.OBJECTSTORE.length-1]]);
			return this;
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
			this.flag = true;
			this.$R(this.OBJECTSTORE.slice(0,param));
			return this;
		},

		skip: function(param) {
			this.flag = true;
			this.$R(this.OBJECTSTORE.slice(param));
			return this;
		},

		range: function(from, to) {
			this.flag = true;
			this.$R(this.OBJECTSTORE.slice(from,to));
			return this;
		},
		sort: function(property) {
			property = property ? property : "id";
			var sortOrder = 1;
			if(property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
			}
			var array = this.get();
			this.$R(array.sort(function (a,b) {
				var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				return result * sortOrder;
			}));


			return this;
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
			results = new RasDB(this.OBJECTSTORE),
			self =  this;
			return {
				next : function () {
					from = to;
					to = to + numberOfResults;
					if(to > results.length) {
						to = results.length -1;
					}
					if(to <= results.OBJECTSTORE.length)	return results.range(from,to).get();
				},
				prev : function() {
					from = (from - numberOfResults < 0) ? 0 : (from - numberOfResults);
					to = (to - numberOfResults < 0) ? 0 : numberOfResults;
					return results.range(from, to).get();
				}
			}
		},

		writeToLS : function() {
			localStorage[this.namespace] = JSON.stringify(this.OBJECTSTORE);
		},

		readFromLS : function() {
			return localStorage[this.namespace]? JSON.parse(localStorage[this.namespace]) : [];
		}


	}
})(window, document, localStorage);
