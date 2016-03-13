myApp.service('dataStorage', function($http) {
	var self = this;
	this.comments = [];
	this.current_user;
	this.users = [];
	this.tacos = [];

	this.getCurrentUser = function() {
		return this.current_user;
	};

	this.comments.getAll = function() {
    	return $http.get('/comments.json').success(function(data){
      		angular.copy(data, this.comments);
	  	});
	};

	this.comments.create = function(comment) {
	  return $http.post('/comments.json', comment).success(function(data){
	    this.comments.push(data);
	  });
	};

	this.users.getAll = function() {
    	return $http.get('/users.json').success(function(data){
      		angular.copy(data, this.users);
	  	});
	};

	this.users.create = function(user) {
	  return $http.post('/users.json', user).success(function(data){
	    this.users.push(data);
	  });
	};

	this.tacos.getAll = function() {
    	return $http.get('/tacos.json').success(function(data){
      		angular.copy(data, this.tacos);
	  	});
	};

	this.tacos.create = function(taco) {
	  return $http.post('/tacos.json', taco).success(function(data){
	    this.tacos.push(taco);
	  });
	};
});