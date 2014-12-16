(function() {
	/*
		Constructor function to initialize the RAS DB object.
	 */
	function RasDB(configObject) {
		this.configObject = configObject;
		this.OBJECTSTORE = [];
		return this;
	}
	
	RasDB.prototype = {

		dump : function(data) {
			if(data && typeof data==="string") {
				//TODO: Add ajax functionality to fetch from endpoint and populate
			}
			if(data && typeof data === "object" && Object.prototype.toString.call(data) === "[object Array]") {
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
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return this.OBJECTSTORE.splice(index, 1)
			})
			return this;
		},
		
		update : function(object){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return obj=object;
			});
			return this;
		},
	
		find : function(object){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return obj;
			})
			return this;
		},
		
		getAll : function(){
			return this.OBJECTSTORE;
		},
		
		findBy : function(property, value){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj[property]==value) return obj;
			})
		},
		
		findById : function(id){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj.id==id) return obj;
			})
		}
	}
	return RasDB;
})();
