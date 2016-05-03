// Code goes here
angular.module('app', []);

angular.module('app').controller('mainController', ['$scope', function($scope) {
  $scope.person1 = {
      name: "Abhinava",
      address: {
        city: "bgl",
        state: "ka"
      },
      friends: [
        'abc',
        'xyz'
      ],
      level: 0
    },
    $scope.person2 = {
      name: "Mishra",
      address: {
        city: "bglo",
        state: "kapa"
      },
      friends: [
        'abc',
        'lmn'
      ],
      level: 1
    },
    $scope.droid1 = {
      name : "R2 D2",
      specifications : {
        manufacturer : "ABC company",
        type : "Rolling bot"
      },
      level :1
    }

}]);

angular.module('app').directive('stateDisplay', function() {
  return {
    link: function(scope, el, attrs) {
      scope.$watch(attrs['stateDisplay'], function(newVal) {
        switch (newVal) {
          case 0:
            el.css('color', 'white');
            break;

          case 1:
            el.css('color', 'red');
            break;
            
          case 2:
            el.css('color', 'yellow');
            break;

        }

      });
    }
  }
});

angular.module('app').directive('userPanel',function(){
  return {
    restrict : 'E',
    transclude : true,
    templateUrl : 'userPanel.html',
    scope : {
      name : '@',
      level : '=',
      initialCollapsed : '@collapsed'
    },
    controller : function($scope){
      
      $scope.collapsed = ($scope.initialCollapsed === "true");
      
      $scope.nextState = function(evt) {
        
        evt.stopPropagation();
        evt.preventDefault();
        
        $scope.level++;
        $scope.level = $scope.level % 3;

      }
      
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
      
      
    }
  }
});


angular.module('app').directive('droidInfoCard', function() {
  return {
    templateUrl: "droidInfo.html",
    restrict: "E",
    scope: {
      droid: '=',
      initialCollapsed: '@collapsed'

    },
    controller: function($scope) {
      //$scope.collapsed = false;
    }
  }
});




angular.module('app').directive('personInfoCard', function() {
  return {
    templateUrl: "personInfo.html",
    restrict: "E",
    scope: {
      person: '=',
      initialCollapsed: '@collapsed'

    },
    controller: function($scope) {
      //$scope.collapsed = false;

      $scope.knightUser = function(person) {
        person.rank = "Knight";
      }

      $scope.removeFriend = function(friend) {
        var idx = $scope.person.friends.indexOf(friend);
        if (idx > -1) {
          $scope.person.friends.splice(idx, 1);
        }

      }
    }
  }
});


angular.module('app').directive('address', function() {
  return {
    templateUrl: "address.html",
    restrict: "E",
    scope: true,
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }

    }
  }
});

angular.module('app').directive('removeFriend', function() {
  return {
    templateUrl: "removeFriend.html",
    restrict: "E",
    scope: {
      notifyParent: "&method"
    },
    controller: function($scope) {

      $scope.removing = false;

      $scope.startRemove = function() {
        $scope.removing = true;
      }
      $scope.cancelRemove = function() {
        $scope.removing = false;
      }

      $scope.confirmRemove = function() {
        $scope.notifyParent();
      }


    }
  }

});