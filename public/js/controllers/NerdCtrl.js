angular.module('NerdCtrl', [])
	
	// inject the Nerd service into our controller
	.controller('NerdController', function($scope, $http, Nerd) {
		// object to hold all the data for the new nerd form
		$scope.nerdData = {};
		
		
		// loading variable to show the spinning loading icon
		$scope.loading = true;
		$scope.add = true;
		// get all the nerds first and bind it to the $scope.nerds object
		// use the function we created in our service
		// GET ALL NERDS ====================================================
		
		Nerd.get()
			.success(function(data) {
			});
		
		$scope.setPage = function(pageNo) {
        	$scope.currentPage = pageNo;
		};

	});
