npwmApp.controller('restaurantCtrl', ['$scope', '$http', '$rootScope', '$stateParams',
	function($scope, $http, $rootScope, $stateParams){
		// $rootScope.serverUrl = pythonUrl.url;
		$scope.comment = {}
		$http.get($rootScope.serverUrl+'/restaurant/'+$stateParams.id).
		success(function(data){
			if(data.success == true){
				$scope.restaurant = data.response[0];
			}
		});
		$scope.submitComment = function(){
			$http({
				url: $rootScope.serverUrl+'/restaurant/'+$stateParams.id,
				method: 'POST',
				data: {comment: $scope.comment.val},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(data){
				if(data.success== true){
					$scope.restaurant = data.response[0];
				}
			});
		}
	}
])