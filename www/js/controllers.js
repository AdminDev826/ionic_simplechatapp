angular.module('app.controllers', [])
  
.controller('entranceCtrl', ['$scope', '$stateParams', '$state', '$firebaseAuth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $firebaseAuth) {
    
    $scope.openAboutUs = function(){
        $state.go("aboutUs");
        return false;
    }
    
    // if User is logged in, redirect to which mode
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) {
              if (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                //$state.go("whichMode");
              } else {
                console.log("Signed out");
                //$state.go("entrance");
                // already at "entrance"
              }
    });

    //// anonymous login, https://github.com/firebase/angularfire/blob/master/docs/guide/user-auth.md
    

      

    
}])
   
.controller('parentSignupCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state) {
    
    var auth = $firebaseAuth();
    
    
    $scope.data = {
        'message': '',
        'error': '',
        'name': '',
        'email': '',
        'password': '',
        'completedOnboarding': false,
        'lastModeIn': 'parent'
    }
    
    // if session is active, redirect user 
    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $state.go("servicePlan");
        }
    });
    
    // sign up with Facebook
    $scope.signupWithFacebook = function(){
        auth.$signInWithRedirect("facebook").then(function(firebaseUser) {
            // not called
            //console.log("------->Signed in as:", firebaseUser.uid);
            //$state.go("servicePlan");
            
        }).catch(function(error) {
            $scope.data.error = error.message;  
            console.log("Authentication failed:", error);
        });
    }
    
     // sign up with Facebook
    $scope.signupWithGoogle = function(){
        auth.$signInWithPopup("google").then(function(firebaseUser) {
            auth.$onAuthStateChanged(function(firebaseUser) {
              if (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                //$state.go("servicePlan");
              } else {
                console.log("Signed out");
                //$state.go("entrance");
              }
            });
          }).catch(function(error) {
            $scope.data.error = error.message;  
            //console.log("Authentication failed:", error);
          });
    }
    
    $scope.logout = function(){
        auth.$signOut();
        console.log("Signed out");
        $state.go("entrance");
    }
    
}])
   
.controller('parentLoginCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state) {
    
    var auth = $firebaseAuth();
    
    $scope.data = {
        'message': '',
        'error': '',
        'name': '',
        'email': '',
        'password': '',
        'completedOnboarding': false,
        'lastModeIn': 'parent'
    }

    // sign up with Facebook
    $scope.signupWithFacebook = function(){
        auth.$signInWithPopup("facebook").then(function(firebaseUser) {
            $state.go("whichMode");
            //console.log("Signed in as:", firebaseUser);
          }).catch(function(error) {
            $scope.data.error = error.message;  
            //console.log("Authentication failed:", error);
          });
        
    }
    
     // sign up with Facebook
    $scope.signupWithGoogle = function(){
        auth.$signInWithPopup("google").then(function(firebaseUser) {
            $state.go("whichMode");
            //console.log("Signed in as:", firebaseUser);
          }).catch(function(error) {
            $scope.data.error = error.message;  
            //console.log("Authentication failed:", error);
          });
        
    }

}])
   
.controller('signupWithEMailCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state) {
    
    var auth = $firebaseAuth();
    
    $scope.data = {
        'message': '',
        'error': '',
        'name': '',
        'email': '',
        'password': '',
        'completedOnboarding': false,
        'lastModeIn': 'parent'
    }

     
    $scope.createUser = function() {
        $scope.data.error = '';
        auth.$createUserWithEmailAndPassword($scope.data.email + '', $scope.data.password + '').then(function(){

          firebase.auth().onAuthStateChanged(function(user) {
              
            if (user) {
              user.updateProfile({
                displayName: $scope.data.name
              }).then(function() {
                $state.go("servicePlan");
              }, function(error) {
                $scope.data.error = error.message;
              });

            } else {
              // No user is signed in.
            }
          });
          

        }).catch(function(error){
          $scope.data.error = error.message;
        });
    }
   
   

    
    // sign up with email & password
    /*
    $scope.createUser = function() {

      $scope.message = null;
      $scope.error = null;
      // Create a new user
      auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          //$scope.error = error;
      }).catch(function(error) {
          $scope.$apply(function(){
              $scope.error = error.message;
          });
      });
    };
    */
}

])
   
.controller('loginWithEMailCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state) {
    
    var auth = $firebaseAuth();
    
    $scope.data = {
        'message': '',
        'error': '',
        'email': '',
        'password': '',
        'completedOnboarding': false,
        'lastModeIn': 'parent'
    }


    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });
    
    $scope.loginWithEmail = function(){
        $scope.data.error = ''; // reset
        //console.log("$scope.data.email: "+$scope.data.email);
 
        auth.$signInWithEmailAndPassword($scope.data.email,$scope.data.password).then(function(){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    $state.go("whichMode");
                }
            });
        }).catch(function(error){
          $scope.data.error = error.message;
        });
        
    }
    
    $scope.openPasswordReset = function(){
        $state.go("passwordReset");
    }

}

])
   
.controller('whichModeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.returnToPrevious = function(){
        window.history.go(-1);
    };
}])
   
.controller('aboutUsCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    
    $scope.returnToPrevious = function(){
        window.history.go(-1);
    };
    
}])
   
.controller('passwordResetCtrl', ['$scope', '$stateParams', '$firebaseAuth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth) {

    var auth = $firebaseAuth();
    $scope.data = {
        'message': '',
        'error': '',
        'email': ''
    }    
    
    $scope.sendResetEmail = function(){
        $scope.data.error = ''; // reset
        $scope.data.message = '';

        auth.$sendPasswordResetEmail($scope.data.email).then(function(){
            $scope.data.message = "Please check your e-mail for a the Password Reset link.";
        }).catch(function(error){
          $scope.data.error = error.message;
        });
        
    }

}])
   
.controller('step1Ctrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray) {

    var auth = $firebaseAuth();
    
    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");  // keep this live, remove comment, before going Production
        }
    });
    
    $scope.data = {
        'message': '',
        'error': '',
        'datetimestamp': firebase.database.ServerValue.TIMESTAMP,
        'kidusername': '',
        'kidpin': '',
        'kidgrade': '',
        'kidavatar': 'https://firebasestorage.googleapis.com/v0/b/popchart_avatars/o/newuser_default_images%2Fstarting_avatar_default.png?alt=media&token=dc1b2a91-e4ce-4765-90f4-fbf0b4df084d',
        'kidvc_name': 'Points',
        'kidvc_balance_snapshot': 0,
        'kidvc_ratio': 0.5,
        'kidid': '',
        'activitytitle': 'New kid added!',
        'activityvc_value': 0,
        'activityextra': 'Welcome, '
    }

    $scope.addLater = function(){
        $state.go("parentDashboard");
        return false;
    };
    
    $scope.addKid = function(){
        // all fields are required to continue
        if($scope.data.kidusername && $scope.data.kidpin && $scope.data.kidgrade){
        
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('pointsByKid');
            $scope.data.kidid = ref.push().key;
            console.log("$scope.data.kidid: "+$scope.data.kidid);
            // create a synchronized array
            $scope.kiddos = $firebaseArray(ref);
            // add new items to the array
                $scope.kiddos.$add({
                 parent_uid: $scope.firebaseUser.uid,
                 username: $scope.data.kidusername,
                 kidpin: $scope.data.kidpin,
                 avatar_url: $scope.data.kidavatar,
                 grade: $scope.data.kidgrade,
                 timestamp_added: $scope.data.datetimestamp,
                 vc_name: $scope.data.kidvc_name,
                 vc_balance_snapshot: $scope.data.kidvc_balance_snapshot,
                 vc_ratio: $scope.data.kidvc_ratio
                });
            //$scope.data.kiddos = '';
            $scope.addActivity();
            
            $state.go('onboardingStep2');
        }else{
            alert("Please input the username, pin code and grade/age level.");
        }
    }
    
    $scope.addActivity = function(){
        var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('activity');
        // create a synchronized array
        $scope.activity = $firebaseArray(ref);
        
        // add new items to the array
            $scope.activity.$add({
                parent_only: true,    
                parent_uid: $scope.firebaseUser.uid,
                kid_only: false,
                kid_id: $scope.data.kidid,
                kid_name: $scope.data.kidusername,
                kid_avatar: $scope.data.kidavatar,
                avail_to_all: false,
                title: $scope.data.activitytitle,
                datetime_start: $scope.data.datetimestamp,
                vc_value: $scope.data.activityvc_value,
                vc_name: $scope.data.kidvc_name,
                section: 'pointsByKid',
                extra: $scope.data.activityextra + $scope.data.kidusername
            });
    }
}])
   
.controller('addAKidCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray) {

    var auth = $firebaseAuth();
    
    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");  // keep this live, remove comment, before going Production
        }
    });
    
    $scope.data = {
        'message': '',
        'error': '',
        'datetimestamp': firebase.database.ServerValue.TIMESTAMP,
        'kidusername': '',
        'kidpin': '',
        'kidgrade': '',
        'kidavatar': 'https://firebasestorage.googleapis.com/v0/b/popchart_avatars/o/newuser_default_images%2Fstarting_avatar_default.png?alt=media&token=dc1b2a91-e4ce-4765-90f4-fbf0b4df084d',
        'kidvc_name': 'Points',
        'kidvc_balance_snapshot': 0,
        'kidvc_ratio': 0.5,
        'kidid': '',
        'activitytitle': 'New kid added!',
        'activityvc_value': 0,
        'activityextra': 'Welcome, '
    }

    $scope.returnToPrevious = function(){
        window.history.go(-1);
    };
    
    $scope.addKid = function(){
        // all fields are required to continue
        if($scope.data.kidusername && $scope.data.kidpin && $scope.data.kidgrade){
        
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('oldPoints');
            $scope.data.kidid = ref.push().key;
            console.log("$scope.data.kidid: "+$scope.data.kidid);
            // create a synchronized array
            $scope.kiddos = $firebaseArray(ref);
            // add new items to the array
                $scope.kiddos.$add({
                 parent_uid: $scope.firebaseUser.uid,
                 username: $scope.data.kidusername,
                 kidpin: $scope.data.kidpin,
                 avatar_url: $scope.data.kidavatar,
                 grade: $scope.data.kidgrade,
                 timestamp_added: $scope.data.datetimestamp,
                 vc_name: $scope.data.kidvc_name,
                 vc_balance_snapshot: $scope.data.kidvc_balance_snapshot,
                 vc_ratio: $scope.data.kidvc_ratio
                });
            //$scope.data.kiddos = '';
            $scope.addActivity();
            
            $state.go('oldPoints');
        }else{
            alert("Please input the username, pin code and grade/age level.");
        }
    }
    
    $scope.addActivity = function(){
        var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('activity');
        // create a synchronized array
        $scope.activity = $firebaseArray(ref);
        
        // add new items to the array
            $scope.activity.$add({
                parent_only: true,    
                parent_uid: $scope.firebaseUser.uid,
                kid_only: false,
                kid_id: $scope.data.kidid,
                kid_name: $scope.data.kidusername,
                kid_avatar: $scope.data.kidavatar,
                avail_to_all: false,
                title: $scope.data.activitytitle,
                datetime_start: $scope.data.datetimestamp,
                vc_value: $scope.data.activityvc_value,
                vc_name: $scope.data.kidvc_name,
                section: 'oldPoints',
                extra: $scope.data.activityextra + $scope.data.kidusername
            });
    }
}])
   
.controller('step2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('step3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('servicePlanCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('servicePlansBUCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('thankYouCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('parentModeCtrl', ['$scope', '$stateParams', '$state', '$firebaseAuth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $firebaseAuth) {
    
    

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");
        }
    });
    
    
    
    $scope.logout = function(){
        auth.$signOut();
        console.log("Signed out");
        $state.go("entrance");
    }

}])
   
.controller('kidsCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray) {
    var auth = $firebaseAuth();
    
     $scope.data = {
        'message': '',
        'error': '',
        'datetimestamp': firebase.database.ServerValue.TIMESTAMP,
        'kidusername': '',
        'kidpin': '',
        'kidgrade': '',
        'kidavatar': '',
        'kidvc_name': 'Points',
        'kidvc_balance_snapshot': 0,
        'kidvc_ratio': 0.5,
        'kidid': ''
    }
    
    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('kids');
            $scope.kids = $firebaseArray(ref);

            
        }else{
            $state.go("entrance");  // keep this live, remove comment, before going Production
        }
    });
    
   
    
    
    

}])
   
.controller('theOfficeCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray) {
    var auth = $firebaseAuth();
    
     $scope.data = {
        'message': '',
        'error': '',
        'datetimestamp': firebase.database.ServerValue.TIMESTAMP,
        'kidusername': '',
        'kidpin': '',
        'kidgrade': '',
        'kidavatar': '',
        'kidvc_name': 'Points',
        'kidvc_balance_snapshot': 0,
        'kidvc_ratio': 0.5,
        'kidid': ''
    }
    
    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('kids');
            $scope.kids = $firebaseArray(ref);

            
        }else{
            $state.go("entrance");  // keep this live, remove comment, before going Production
        }
    });
    
   
    
    
    

}])
   
.controller('popTownBankCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray) {
    var auth = $firebaseAuth();
    
    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            
            $scope.firebaseUser = firebaseUser;
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('kids');
            $scope.kids = $firebaseArray(ref);

            //$scope.accounts = Bank.accounts;
            
            //$scope.items = Todos.items;
    

            
        }else{
            $state.go("entrance");  // keep this live, remove comment, before going Production
        }
    });
    
   
    
    
    

}])
   
.controller('choresByKidCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', 'Chores', '$ionicModal', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, Chores, $ionicModal, $firebaseArray) {
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");
        }
    });
    
    var kid_un = $stateParams.kidusername;
    var kid_id = $stateParams.kidid;
    var parent_uid = $stateParams.parent_uid;
    var kid_vc_name = $stateParams.kidvc_name;
    
    $scope.data = {
        'pageTitle': kid_un + 's Chores &amp; Tasks',
        "kid_un": kid_un,
        "kid_id": kid_id,
        "parent_uid": parent_uid,
        "kid_vc_name": kid_vc_name
    }

    $scope.items = Chores.getFreshItems(parent_uid, kid_id);
    
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" +
    "<ion-header-bar class='bar-balanced'>" +
      "<h1 class='title'>Add a Chore</h1>" +
      '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
    "</ion-header-bar>" +
    "<ion-content class='padding'>" +
      "<label class='item item-input'><input type='text' placeholder='Title' ng-model='data.title' /></label>" +
      "<label class='item item-input'><input type='text' placeholder='Description' ng-model='data.description' /></label>" +
      "<label class='item item-input'><input type='text' placeholder='Points Payout (max is 5)' ng-model='data.payout' min='1' max='5' /></label>" +
      "<button ng-click='addItem()' class='button button-balanced button-block'>Submit</button>" +
    "</ion-content>" +
  "</ion-modal-view>", {
        scope: $scope,
        animation: 'slide-in-up'
    })
    
    $scope.showModal = function(){
        $scope.modal.show();
    }
    
    $scope.closeModal = function(){
        $scope.data.title = '';
        $scope.data.description = '';
        $scope.data.payout = '';
        $scope.modal.hide();
    }
    
    $scope.addItem = function(){
        Chores.addItem($scope.data.title, $scope.data.description, $scope.data.payout, $scope.data.parent_uid, $scope.data.kid_id);
        $scope.closeModal();   
    }
    

}])
   
.controller('finishedChoresByKidCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', 'Chores', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, Chores) {
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");
        }
    });
    
    var kid_un = $stateParams.kidusername;
    var kid_id = $stateParams.kidid;
    var parent_uid = $stateParams.parent_uid;
    var kid_vc_name = $stateParams.kidvc_name;
    
    $scope.data = {
        "pageTitle": kid_un + "'s Chores",
        "kid_un": kid_un,
        "kid_id": kid_id,
        "parent_uid": parent_uid,
        "kid_vc_name": kid_vc_name
    }

    //$scope.items = Chores.items;
    //var ref = firebase.database().ref('users/' + parent_uid + '/tasks/').child(kid_id);
    //$scope.items = $firebaseArray(ref);
    
    $scope.items = Chores.getFreshItems(parent_uid, kid_id);

}])
   
.controller('pointsByKidCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$state', '$firebaseArray', 'Bank', '$ionicPopup', 'Transactions', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $state, $firebaseArray, Bank, $ionicPopup, Transactions) {
    var auth = $firebaseAuth();
    
    var kid_un = $stateParams.kidusername;
    var kid_vc_name = $stateParams.kidvc_name;
    var kid_id = $stateParams.kidid;
    var parent_uid = $stateParams.parent_uid;
    var kidvc_balance = $stateParams.kidvc_balance_snapshot;
    var kidavatar_url = $stateParams.kidavatar_url;
    
    $scope.items = Transactions.items;
    
    // used in the UI
    $scope.data = {
        "pageTitle": kid_un +"'s Account",
        "kid_un": kid_un,
        "kid_vc_name": kid_vc_name,
        "kid_id": kid_id,
        "parent_uid": parent_uid,
        "kidvcBalanceSnapshot": kidvc_balance,
        "kidavatar_url": kidavatar_url,
        "reason": '',
        'depositamount': 1,
        'withdrawamount': 1
    }
    
    //$scope.account = Bank.accounts[Bank.accounts.$indexFor(kid_id)];
    
    $scope.makeDeposit = function(){
        var depositData = {
            'kidusername': kid_un,
            'kidid': kid_id,
            'kidvc_balance_snapshot': kidvc_balance,
            'parent_uid': parent_uid,
            'depositamount': 1,
            'withdrawamount': 0,
            'reason': $scope.data.reason
        }
        
        Bank.deposit(depositData).then(function(){
            $scope.data.kidvcBalanceSnapshot = parseInt($scope.data.kidvcBalanceSnapshot) + depositData.depositamount;
            
            kidvc_balance++;
            
            $scope.data.reason = '';
            
            $ionicPopup.alert({
                title: 'Thank you!',
                template: 'Your deposit has been posted.'
            });
        })
    }
    
    
    $scope.confirmWithdraw = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Withdraw 1 '+kid_vc_name,
         template: 'Are you sure you want to make this Withdraw?'
       });
    
       confirmPopup.then(function(res) {
         if(res) {
           $scope.makeWithdraw();
         } else {
           console.log('You are not sure');
         }
       });
     };
    
    
    

    $scope.makeWithdraw = function(){
        var withdrawData = {
            'kidusername': kid_un,
            'kidid': kid_id,
            'kidvc_balance_snapshot': kidvc_balance,
            'parent_uid': parent_uid,
            'depositamount': 0,
            'withdrawamount': 1,
            'reason2': $scope.data.reason2
        }
        
        Bank.withdraw(withdrawData).then(function(){
            $scope.data.kidvcBalanceSnapshot = parseInt($scope.data.kidvcBalanceSnapshot) - withdrawData.withdrawamount;
            
            kidvc_balance--;
            $scope.data.reason2 = '';
            
            $ionicPopup.alert({
                title: 'Confirnmation',
                template: 'Your withdraw has been posted.'
            });
        })
    }

    // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            
            $scope.firebaseUser = firebaseUser;
            
        }else if(kid_id.length < 1){
            $state.go("popTownBank");
        }else{
            $state.go("entrance");
        }
    });
    
    

}])
   
.controller('choreDetailCtrl', ['$scope', '$stateParams', 'Chores', '$state', '$firebaseAuth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Chores, $state, $firebaseAuth) {
    var auth = $firebaseAuth();

    $scope.data = {
        'kidid': $stateParams.kidid,
        'kidusername': $stateParams.kidusername,
        'parent_uid': $stateParams.parent_uid,
        'kidvc_name': $stateParams.kidvc_name,
        'chore_id': $stateParams.chore_id
    }
    
    
    
    //console.log(JSON.stringify($scope.data));

    $scope.item = Chores.items[Chores.items.$indexFor($stateParams.chore_id)];
    
    
    $scope.showSaveButton = false;
    $scope.showSaveBtn = function(){
        $scope.showSaveButton = true;
    }
    
    $scope.saveChore = function(){
        Chores.updatePayout($scope.item, item.payout);
        Chores.updateTitleAndDescrip($scope.item, item.title, item.description);
        $scope.showSaveButton = false;
    }
    
    
    //console.log("$scope.item: "+JSON.stringify($scope.item));
    
    $scope.toggleFinished = function(){
        if ($scope.item.status){
            Chores.setFinished($scope.item, false);
        }else{
            Chores.setFinished($scope.item, true);
        }
    }
    
     // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");
        }
    });
    

}])
   
.controller('marketplaceCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$firebaseArray', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $firebaseArray, $state) {
    var auth = $firebaseAuth();
    
     // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
        }else{
            $state.go("entrance");
        }
    });

}])
   
.controller('marketplaceItemsCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$firebaseArray', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $firebaseArray, $state) {
    var auth = $firebaseAuth();
    
     // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
            
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid).child('store');
            $scope.storeItems = $firebaseArray(ref);
            
        }else{
            $state.go("entrance");
        }
    });

}])
   
.controller('marketplaceItemDetailCtrl', ['$scope', '$stateParams', '$firebaseAuth', '$firebaseObject', '$state', '$ionicModal', '$cordovaFile', '$firebaseStorage', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, $firebaseObject, $state, $ionicModal, $cordovaFile, $firebaseStorage) {
    var auth = $firebaseAuth();
    $scope.data = {
        'storeItemId': $stateParams.storeItemId
    }
    
     // any time auth state changes, add the user data to scope
    auth.$onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser){
            $scope.firebaseUser = firebaseUser;
            
            var ref = firebase.database().ref('users/' + $scope.firebaseUser.uid + '/store/').child($scope.data.storeItemId);
            $scope.storeItem = $firebaseObject(ref);
            
        }else{
            $state.go("entrance");
        }
    });
    
    
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" +
    "<ion-header-bar class='bar-balanced'>" +
      "<h1 class='title'>Marketplace Item Edit</h1>" +
      '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
    "</ion-header-bar>" +
    "<ion-content class='padding'>" +
      "<label class='item item-input'><b>Name:&nbsp;</b><input type='text' placeholder='Item name' ng-model='storeItem.name' /></label>" +
      "<label class='item item-input'><b>Description:&nbsp;</b><input type='text' placeholder='Description' ng-model='storeItem.description' /></label>" +
      "<label class='item item-input'><b>Keywords:&nbsp;</b><input type='text' placeholder='Keywords' ng-model='storeItem.keywords' /></label>" +
      "<label class='item item-input'><b>Kid price:&nbsp;</b><input type='text' placeholder='Kid cost' ng-model='storeItem.price_kid' /></label>" +
      "<label class='item item-input'><b>Parent cost:&nbsp;</b><input type='text' placeholder='Parent cost' ng-model='storeItem.price_actual' /></label>" +
      "<button ng-click='updateItem()' class='button button-balanced button-block'>Save</button>" +
    "</ion-content>" +
  "</ion-modal-view>", {
        scope: $scope,
        animation: 'slide-in-up'
    })
    
    $scope.showModal = function(){
        $scope.modal.show();
    }
    
    $scope.closeModal = function(){
        $scope.storeItem.name = '';
        $scope.storeItem.description = '';
        $scope.storeItem.keywords = '';
        $scope.storeItem.price_kid = '';
        $scope.storeItem.price_actual = '';
        $scope.storeItem.img_url = '';
        $scope.storeItem.category = '';
        $scope.modal.hide();
    }
    
    $scope.updateItem = function(){
        firebase.database().ref('users/' + $scope.firebaseUser.uid + '/store/'+$scope.data.storeItemId).update({
            name: $scope.storeItem.name,
            description: $scope.storeItem.description,
            keywords: $scope.storeItem.keywords,
            price_kid: $scope.storeItem.price_kid,
            price_actual: $scope.storeItem.price_actual,
            invert_time: Number.MAX_SAFE_INTEGER - parseInt(Date.now()),
            datetime_created: $scope.storeItem.datetime_created
            //category: $scope.storeItem.category,
            //img_url: $scope.storeItem.img_url
        });
        
        $scope.closeModal();
    }
    
    $scope.toggleFinished = function(){
        if ($scope.storeItem.status === 'Active'){
            firebase.database().ref('users/' + $scope.firebaseUser.uid + '/store/'+$scope.data.storeItemId).update({
                status: 'Inactive'
            });
        }else{
            firebase.database().ref('users/' + $scope.firebaseUser.uid + '/store/'+$scope.data.storeItemId).update({
                status: 'Active'
            });
        }
    }
    
    $scope.replaceImage = function(){
        
        // read the new image from the user
        var rightNow = firebase.database.ServerValue.TIMESTAMP;
            // File or Blob
        var file = $('#itemImage').prop('files')[0];
        var metadata = {
            contentType: file.type
        };
        // Points to the root reference
        var storageRef = firebase.storage().ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + $scope.firebaseUser.uid+ '/' + file.name).put(file, metadata);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, function(error) {

              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                      console.log("missing permission");
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                firebase.database().ref('users/' + $scope.firebaseUser.uid + '/store/'+$scope.data.storeItemId).update({
                    img_url: uploadTask.snapshot.downloadURL
                });

            });
            
            
            
           
            
        
    }
    
    /*
    function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
    */
    

}])
   
.controller('openlayerTestCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('parentNotificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('addAParentOrGuardianCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 