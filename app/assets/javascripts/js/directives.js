myApp.directive('tacoEntry', function() {
	return {
		replace: true,
		transclude: true,
		scope: {
			img: '=',
			taco: '=',
			rating: '=',
			latlong: '=',
			comment: '='
		},
		templateUrl: 'home/tacoEntry.html',
		controller: function($scope, $state) {
			$scope.rating = $scope.rating;
			$scope.getRating = function(num) {
			    return new Array(num);   
			}
			$scope.getNotRating = function(num) {
			    return new Array(5-num);   
			}
		}
	};
});

console.log("Directives loaded");