npwmApp.controller('searchCtrl', ['$scope', '$http', '$stateParams', '$rootScope', //'Pagination',
	function($scope, $http, $stateParams, $rootScope){
		$scope.query = $stateParams.query.replace(/-/g, ' ');
		// $rootScope.serverUrl = pythonUrl.url;
		$http.get($rootScope.serverUrl+'/search?q='+$scope.query).
		success(function(data){
			if(data.success == true){
				$scope.restaurants = data.response;
			}
		})
	}
])