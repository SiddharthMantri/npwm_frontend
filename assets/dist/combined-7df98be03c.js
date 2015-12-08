npwmApp.controller('indexCtrl', ['$scope', '$http', '$rootScope', '$state',
	function($scope, $http, $rootScope, $state){
		$scope.queryObj = {};
		$scope.serverList = [pythonUrl, nodeUrl]
		$scope.getCuisines = function(){
			$http.get($rootScope.serverUrl+'/cuisines').
			success(function(data){
				$scope.cuisines = data.response;	
			})
		}
		$scope.setServer = function(flag){
			$rootScope.serverUrl = flag == 2 ? nodeUrl.url:pythonUrl.url;
			$scope.selectedServer = flag == 2 ? nodeUrl:pythonUrl;
			$scope.getCuisines()
		}
		$scope.invokeSearch = function(){
			q = $scope.asyncSelected.replace(/ /g, '-');
			$state.go('search', {query: q});
		}
	}
])
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
npwmApp.controller('searchCtrl', ['$scope', '$http', '$stateParams', '$rootScope', //'Pagination',
	function($scope, $http, $stateParams, $rootScope){
		$scope.query = $stateParams.query.replace(/-/g, ' ');
		$rootScope.serverUrl = pythonUrl.url;
		$http.get($rootScope.serverUrl+'/search?q='+$scope.query).
		success(function(data){
			if(data.success == true){
				$scope.restaurants = data.response;
			}
		})
	}
])