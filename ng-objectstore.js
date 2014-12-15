angular.module("ng-objectstore",[])
.factory("ObjectStore", function() {
	function ObjectStore(url) {
		if(url && typeof url==="string") this.url = arguments[0];
		if(typeof arguments[0]==="object") this.OBJECTSTORE = arguments[0] || [];
	}
	
	ObjectStore.prototype.add = function(object) {
		this.OBJECTSTORE.push(object);
	}
	
	ObjectStore.prototype.delete = function(object) {
		this.OBJECTSTORE.map(function(obj, index) {
			if(obj===object) return this.OBJECTSTORE.splice(index, 1)
		})
	}
	
	ObjectStore.prototype.update = function(object){
		this.OBJECTSTORE.map(function(obj, index) {
			if(obj===object) return obj=object;
		})
	}
	
	ObjectStore.prototype.find = function(object){
		this.OBJECTSTORE.map(function(obj, index) {
			if(obj===object) return obj;
		})
	}
	
	ObjectStore.prototype.getAll = function(){
		return this.OBJECTSTORE;
	}
	
	ObjectStore.prototype.findBy = function(property, value){
		this.OBJECTSTORE.map(function(obj, index) {
			if(obj[property]==value) return obj;
		})
	}
	
	ObjectStore.prototype.findById = function(id){
		this.OBJECTSTORE.map(function(obj, index) {
			if(obj.id==id) return obj;
		})
	}
	return ObjectStore;
})