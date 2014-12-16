(function() {
	function RasDB(url) {
		if(url && typeof url==="string") this.url = arguments[0];
		if(typeof arguments[0]==="object") this.OBJECTSTORE = arguments[0] || [];
	}
	
	RasDB.prototype = {
		
		add : function(object) {
			this.OBJECTSTORE.push(object);
		},
	
		delete : function(object) {
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return this.OBJECTSTORE.splice(index, 1)
			})
		},
		
		update : function(object){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return obj=object;
			})
		},
	
		find : function(object){
			this.OBJECTSTORE.map(function(obj, index) {
				if(obj===object) return obj;
			})
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
