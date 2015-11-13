angular.module('caac.users.register.organizers.controller', [
  'caac.shared.navbar.directive',
  'caac.shared.copyright.directive',
  'caac.shared.progress-indicator.directive',
  'caac.shared.title.service',
  'caac.organizers.service',
  'caac.users.auth.service',
  'angucomplete-alt'
]).controller('RegisterOrganizersController', ['$location', '$log', '$scope', 'AuthService', 'OrganizersService', 'TitleService',
  function($location, $log, $scope, AuthService, OrganizersService, TitleService) {
    var self = $scope;
    var logger = $log.getInstance('RegisterOrganizersController');

    self.organizers = [];
    self.registrationForm = {
      name: ''
    };

    self.construct = function() {
      TitleService.set('Register');
      OrganizersService.selectOrganizers()
        .then(function(response) {
          self.organizers = response.data.organizers;
        });
    };

    self.handleRegisterBtnClick = function() {
      AuthService.attemptRegistration(_nestedParams())
        .then(function(resp) {
          // Because of the many-to-many relationship of user to organizer,
          // A new user's organizer(s) cannot be nested in the call to create the user.
          // If an organizer is selected, make a successive call to add it to the just created user.
          if (self.selectedOrganizer) {
            _attemptToAddOrganizerToUser(self.selectedOrganizer.originalObject.id, function() {
              $location.url('dashboard');
            });
          } else {
            $location.url('dashboard');
          }
        })
        .catch(function(resp) {
          self.registrationForm.password = self.registrationForm.password_confirmation = "";
          self.registrationForm.errors = resp.data.errors;
        });
    };

    var _nestedParams = function() {
      var params = self.registrationForm;

      if (!self.selectedOrganizer && self.showOrganization) {
        // An already existing organizer for the user's organization
        params.organizers_attributes = {
          '0': self.organizerForm
        };
      } else if (self.showIndividualOrganizer) {
        // The user identifies as an individual organizer
        self.individualOrganizerForm.name = params.name;
        params.organizers_attributes = {
          '0': self.individualOrganizerForm
        };
      }

      return params;
    };

    var _attemptToAddOrganizerToUser = function(organizerId, callback) {
      AuthService.attemptUpdate({
        'organizer_ids': [organizerId]
      }).then(callback);
    };

    self.construct();
  }
]);