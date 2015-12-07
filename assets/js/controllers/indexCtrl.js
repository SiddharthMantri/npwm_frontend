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