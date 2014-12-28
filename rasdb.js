(function(window, document, LS) {
	/*
		Constructor function to initialize the RAS DB object.
	 */
	window.RasDB = function(objects, namespace, newdb) {
		if(!(this instanceof RasDB)) {
			return new RasDB(objects);
		}
		this.namespace = namespace;
		if({}.toString.call(objects)=="[object Array]") {
			console.log(this.namespace);
			if(newdb) {
				this.OBJECTSTORE = RasDB.prototype.$ObjectStore[namespace] || objects;
			} else {
				this.OBJECTSTORE = objects;
				RasDB.prototype.$addToStores(namespace, objects);
			}
			this.results = objects;
			return this;
		}
		if(objects instanceof RasDB) return objects;
		this.OBJECTSTORE = [];
		this.results = [];
	}
	RasDB.prototype = {
		$ObjectStore : {},
		$addToStores : function(namespace, objects) {
			RasDB.prototype.$ObjectStore[namespace] = objects;
		},

		$R : function(array) {
			return new RasDB(array, this.namespace, true);
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
				this.OBJECTSTORE = data;
				this.results = data;
			}
			if(data && typeof data === "object" && Object.prototype.toString.call(data) === "[object Object]") {
				this.add(data);
			}
			this.writeToLS();
			return this;
		},

		add : function(object) {
			this.OBJECTSTORE.push(object);
			this.results.push(object);
			this.writeToLS();
			return this;
		},

		//TODO: Need to update logic for delete functionality
		delete : function(query, flag) {
			var self = this;
			if(typeof query ==="boolean" && query) {
				this.results.map(function(data) {
					self.OBJECTSTORE.splice(self.OBJECTSTORE.indexOf(data),1);
					self.results.splice(self.results.indexOf(data),1);
				});
			}
			else if ((typeof query === "boolean" && !query) || !query) {
				this.results.map(function(data) {
					self.results.splice(self.results.indexOf(data),1);
				});
			}
			/*else if(typeof query === "object") {
				var matches = this.find(query).get();
				if(this.isArray(matches)) {
					matches.map(function(obj) {
						self.results.splice(self.OBJECTSTORE.indexOf(data),1);
					})
				}
			} */
		},
		isArray : function(obj) {
			return Object.prototype.toString.call(obj)==="[object Array]";
		},
		update : function(query, object){
			this.find(query)[0]=object;
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
			return this.$R(this.OBJECTSTORE.filter(function(obj) {
				return keys.reduce(function(matching, key) {
					if(obj[key]!=object[key]) matching = false;
					return matching;
				}, true);
			}));
		},


		/*
		 Used to match multiple properties of an object.
		 If all the properties match, return the objects list
		 */
		//TODO: Need to check the logic still
		findOr : function(object){
			var keys = Object.keys(object);
			this.$R(this.OBJECTSTORE.reduce(function(array, obj) {
				keys.map(function(key) {
					if(obj[key]==object[key]) {
						if(array.indexOf(obj)==-1) array.push(obj);
					}
				});
				return array;
			}, []));
		},

		findBy : function(property, value){
			return this.$R(this.OBJECTSTORE.filter(function(obj) {
				return (obj[property]==value);
			}));
		},

		findById : function(id){
			var self = this;
			return this.$R(this.OBJECTSTORE.filter(function(obj) {
				if(obj.id==id) return obj;
			}));
		},
		first: function() {
			return this.$R([this.results[0]]);
		},
		last: function() {
			return this.$R([this.results[this.results.length-1]]);
		},
		cache: function() {
			var self = this;
			this.OBJECTSTORE.map(function(obj) {
				this.CacheStore[obj[self.index]] = obj;
			})
		},
		limit : function(param) {
			return this.$R(this.results.slice(0,param));
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
			console.log(this);
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
					if(to === results.results.length-1) return results.range(from,to).get();
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
		},

		writeToLS : function() {
			localStorage[this.namespace] = JSON.stringify(this.OBJECTSTORE);
		},

		readFromLS : function() {
			return localStorage[this.namespace]? JSON.parse(localStorage[this.namespace]) : [];
		}


	}
})(window, document, localStorage);
