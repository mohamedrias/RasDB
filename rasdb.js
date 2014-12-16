(function() {
	/*
		Constructor function to initialize the RAS DB object.
	 */
	window.RasDB = function(configObject) {
		this.configObject = configObject;
		this.OBJECTSTORE = [];
		this.CacheStore = {};
		this.cache = configObject.cache;
		this.index = configObject.index;
		return this;
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
			return this;
		},
		add : function(object) {
			this.OBJECTSTORE.push(object);
			return this;
		},
	
		delete : function(object) {
			return this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return this.OBJECTSTORE.splice(index, 1)
			})
		},
		
		update : function(object){
			return this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return obj=object;
			});
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


		findBy : function(property, value){
			return this.OBJECTSTORE.reduce(function(obj, index) {
				if(obj[property]==value) return obj;
			})
		},
		
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
		}
	}
})();
