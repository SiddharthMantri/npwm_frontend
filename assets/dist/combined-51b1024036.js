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
npwmApp.controller('restaurantCtrl', ['$scope', '$http', '$rootScope', '$stateParams',
	function($scope, $http, $rootScope, $stateParams){
		// $rootScope.serverUrl = nodeUrl.url;
		$scope.comment = {}
		$http.get($rootScope.serverUrl+'/restaurant/'+$stateParams.id).
		success(function(data){
			if(data.success == true){
				$scope.restaurant = data.response[0];
			}
		});
		$scope.submitComment = function(){
			$http.post($rootScope.serverUrl+'/restaurant/'+$stateParams.id, {comment: $scope.comment.val}).
			success(function(data){
				if(data.success== true){
					$scope.restaurant = data.response[0];
				}
			});
		}
	}
])
npwmApp.controller('searchCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
	function($scope, $http, $stateParams, $rootScope, $state){
		$scope.query = $stateParams.query.replace(/-/g, ' ');
		// $rootScope.serverUrl = pythonUrl.url;
		$scope.serverList = [pythonUrl, nodeUrl]
		$scope.getCuisines = function(){
			$http.get($rootScope.serverUrl+'/cuisines').
			success(function(data){
				$scope.cuisines = data.response;	
			})
		}
		if($rootScope.serverUrl){
			for(f in $scope.serverList){
				if($rootScope.serverUrl == f.url){
					$scope.selectedServer = f;
				}
			}
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
		$http.get($rootScope.serverUrl+'/search?q='+$scope.query).
		success(function(data){
			if(data.success == true){
				$scope.restaurants = data.response;
			}
		})
	}
])