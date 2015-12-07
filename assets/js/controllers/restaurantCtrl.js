npwmApp.controller('restaurantCtrl', ['$scope', '$http', '$rootScope', '$state',
	function($scope, $http, $rootScope, $state){
		$scope.queryObj = {};
		$scope.getCuisines = function(){
			$http.get(serverUrl$rootScope.serverUrl+'/cuisines').
			success(function(data){
				
			})
		}
		$scope.setServer = function(flag){
			$rootScope.serverUrl = flag == 0 ? nodeUrl:pythonUrl;
		}

		$scope.search = function(){
			q = $scope.queryObj.query.replace(/ /g, '-');
			$state.go('search', {query: q});
		}
	}
])