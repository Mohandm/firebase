(function() {
	'use strict';
	angular.module('app.login').controller('LoginController', LoginController);
	/* @ngInject */
	function LoginController(AuthService, toastr, $state, $translate, Session,
			LanguageService, Language,ChangePasswordService) {
		/* jshint validthis: true */

		var vm = this, availableLanguageJSON = document.availableLanguageJSON, determinedLang = Language
				.getPreferredLanguage();
		vm.user = {};
		vm.mode = "";
		vm.invalidChar = "";
		vm.selectedLanguage = document.defaultLanguageJSON;
		vm.availableLanguages = availableLanguageJSON;
		vm.passwordPattern = new RegExp(document
				.getElementById('password_charset').innerHTML);
		vm.passwordmin = document.getElementById('password_min').innerHTML;
		vm.passwordmax = document.getElementById('password_max').innerHTML;

		for (var i = 0; i < availableLanguageJSON.length; i++) {
			if (determinedLang === availableLanguageJSON[i].id) {
				vm.selectedLanguage = availableLanguageJSON[i];
				break;
			}
		}
		// If Mode is there,Save it and keep it.
		if (Session.getMode() != "") {
			vm.mode = Session.getMode();
			// Mode Specific Data
			if (vm.mode === "change_password_qa"
					|| vm.mode === "change_password") {
				vm.user.username = Session.getUserName();
				vm.user.company = Session.getCompany();
				Session.setUserName("");
				Session.setCompany("");
			}
		}
		
		if(Session.getFromState()!='' && Session.getFromState()!='relogin')
			{
				vm.message= Session.getMessage();
			}	
		
		// Compare Old and new Password,It should not be same.
		vm.compareOldAndNewPassword = function() {
			if (vm.changePasswordForm.$error.minlength
					|| vm.changePasswordForm.$error.pattern) {
				return;
			}
			if(ChangePasswordService.compareOldAndNewPassword(vm.user.password,vm.user.password_value)){
				vm.changePasswordForm.password_value.$error.samepassword = true;
			}
			else if(vm.changePasswordForm.password_value){
				vm.changePasswordForm.password_value.$error.samepassword = false;
			}
		}
		// Compare New and Confirm password they should be same.
		vm.compareNewAndConfirmPassword = function() {
			if (vm.changePasswordForm.$error.minlength
					|| vm.changePasswordForm.$error.pattern) {
				return;
			}
			if(ChangePasswordService.compareNewAndConfirmPassword(vm.user.password_value,vm.user.password_confirm)){
				vm.changePasswordForm.password_confirm.$error.mismatch = true;
			}
			else if(vm.changePasswordForm.password_confirm){
				vm.changePasswordForm.password_confirm.$error.mismatch = false;
			}
		}
		// Validate new User name at client level
		vm.validateNewUserName = function() {
			var strValidCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-?.,+_";
			var isValid = true;
			if (vm.user.new_user_name) {
				angular.forEach(vm.user.new_user_name, function(theChar) {
					if (strValidCharacters.indexOf(theChar) < 0) {
						if (isValid) {
							isValid = false;
							vm.invalidChar = theChar;
						}
					}
				});
			}
			if (!isValid) {
				vm.changePasswordForm.new_user_name.$error = {
					invalidname : true
				};
			} else {
				vm.changePasswordForm.new_user_name.$error = {
					invalidname : false
				};
			}

		}
		// Disable Submit button till form is valid.
		vm.checkAllFields = function() {

			if (vm.user && vm.user.password && vm.user.password_value
					&& vm.user.password_confirm && vm.user.password !== ""
					&& vm.user.password_value !== ""
					&& vm.user.password_confirm !== "") {
				if (vm.changePasswordForm
						&& vm.changePasswordForm.password_confirm
						&& !vm.changePasswordForm.password_confirm.$error.mismatch
						&& vm.changePasswordForm.password_value
						&& !vm.changePasswordForm.password_value.$error.samepassword
						&& (vm.mode === "change_password_qa"
								&& vm.changePasswordForm.new_user_name && (vm.changePasswordForm.new_user_name === "" || !vm.changePasswordForm.new_user_name.$error.invalidname) || vm.mode === "change_password")) {
					return false;
				} else {
					return true;
				}

			} else {
				return true;
			}
		}

		vm.login = function() {
			if (vm.myForm && vm.myForm.$valid || vm.termsConditionForm
					&& vm.termsConditionForm.$valid || vm.changePasswordForm
					&& vm.changePasswordForm.$valid) {
				vm.user.tandcflag = "on";
				vm.user.userSelectedLanguage = vm.selectedLanguage.id;
				AuthService.login(vm.user).then(function(result) {
					if (result) {
						if (result.mode && result.mode !== "") {
							vm.mode = result.mode;
							Session.setMode(result.mode);
						} else {
							Session.create();
							Session.setMode("");
							$state.go('app.home');
						}
					} else {
						vm.clearForm();
					}
				});
			}
		};
		LanguageService.updateLanguage(vm.selectedLanguage.id);

		vm.changeLanguage = function(langKey) {
			LanguageService.updateLanguage(langKey);
		};

		vm.logout = function() {
			AuthService.logout().then(function() {
				Session.setMode("");
				$state.go('relogin');
			});
		};

		vm.clearForm = function() {
			vm.user.password = '';
			if (vm.user.password_value && vm.user.password_confirm) {
				vm.user.password_value = '';
				vm.user.password_confirm = '';
			}
		};

	}
})();