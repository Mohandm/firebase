(function () {
	'use strict';
	angular.module('app.post').controller('PostController', PostController);
	/*ng-inject*/
	function PostController($firebaseArray, Auth, User) {

		var vm = this;
		var itemsRef = new Firebase("https://ionicfiremohan.firebaseio.com/items");
		vm.postArray = $firebaseArray(itemsRef);
		console.log(vm.postArray);
		vm.post = {};
		vm.submit = function () {
			var object = vm.post;
			object.user = User.getUser();
			vm.postArray.$add({
				object
			});
		}
	}
})();
