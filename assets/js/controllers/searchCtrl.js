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