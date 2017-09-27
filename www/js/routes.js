angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('entrance', {
    url: '/entrance',
    templateUrl: 'templates/entrance.html',
    controller: 'entranceCtrl'
  })

  .state('parentSignup', {
    url: '/parent_signup',
    templateUrl: 'templates/parentSignup.html',
    controller: 'parentSignupCtrl'
  })

  .state('parentLogin', {
    url: '/parent_login',
    templateUrl: 'templates/parentLogin.html',
    controller: 'parentLoginCtrl'
  })

  .state('signupWithEMail', {
    url: '/signup_with_email',
    templateUrl: 'templates/signupWithEMail.html',
    controller: 'signupWithEMailCtrl'
  })

  .state('loginWithEMail', {
    url: '/login_with_email',
    templateUrl: 'templates/loginWithEMail.html',
    controller: 'loginWithEMailCtrl'
  })

  .state('whichMode', {
    url: '/which_mode',
    templateUrl: 'templates/whichMode.html',
    controller: 'whichModeCtrl'
  })

  .state('aboutUs', {
    url: '/about_us',
    templateUrl: 'templates/aboutUs.html',
    controller: 'aboutUsCtrl'
  })

  .state('passwordReset', {
    url: '/password_reset',
    templateUrl: 'templates/passwordReset.html',
    controller: 'passwordResetCtrl'
  })

  .state('step1', {
    url: '/onboarding_step_1',
    templateUrl: 'templates/step1.html',
    controller: 'step1Ctrl'
  })

  .state('addAKid', {
    url: '/parent_dashboard_add_kid',
    templateUrl: 'templates/addAKid.html',
    controller: 'addAKidCtrl'
  })

  .state('step2', {
    url: '/onboarding_step_2',
    templateUrl: 'templates/step2.html',
    controller: 'step2Ctrl'
  })

  .state('step3', {
    url: '/onboarding_step_3',
    templateUrl: 'templates/step3.html',
    controller: 'step3Ctrl'
  })

  .state('servicePlan', {
    url: '/service_plans',
    templateUrl: 'templates/servicePlan.html',
    controller: 'servicePlanCtrl'
  })

  .state('servicePlansBU', {
    url: '/page9',
    templateUrl: 'templates/servicePlansBU.html',
    controller: 'servicePlansBUCtrl'
  })

  .state('thankYou', {
    url: '/thank_you',
    templateUrl: 'templates/thankYou.html',
    controller: 'thankYouCtrl'
  })

  .state('parentMode', {
    url: '/parent_dashboard',
    templateUrl: 'templates/parentMode.html',
    controller: 'parentModeCtrl'
  })

  .state('kids', {
    url: '/parent_dashboard_kids',
    templateUrl: 'templates/kids.html',
    controller: 'kidsCtrl'
  })

  .state('theOffice', {
    url: '/parent_dashboard_chores',
    templateUrl: 'templates/theOffice.html',
    controller: 'theOfficeCtrl'
  })

  .state('popTownBank', {
    url: '/parent_dashboard_points',
    templateUrl: 'templates/popTownBank.html',
    controller: 'popTownBankCtrl'
  })

  .state('choresByKid', {
    url: '/chores_detail',
	params: {
		kidid: "",
		kidusername: "",
		parent_uid: "",
		kidvc_name: ""		
},
    templateUrl: 'templates/choresByKid.html',
    controller: 'choresByKidCtrl'
  })

  .state('finishedChoresByKid', {
    url: '/parent_dashboard_finished_chores',
	params: {
		kidid: "",
		kidusername: "",
		parent_uid: "",
		kidvc_name: ""		
},
    templateUrl: 'templates/finishedChoresByKid.html',
    controller: 'finishedChoresByKidCtrl'
  })

  .state('pointsByKid', {
    url: '/points_detail',
	params: {
		kidid: "",
		kidusername: "",
		kidvc_name: "",
		parent_uid: "",
		kidvc_balance_snapshot: "",
		kidavatar_url: ""		
},
    templateUrl: 'templates/pointsByKid.html',
    controller: 'pointsByKidCtrl'
  })

  .state('choreDetail', {
    url: '/parent_dashboard_chore_detail',
	params: {
		kidid: "",
		kidusername: "",
		parent_uid: "",
		kidvc_name: "",
		chore_id: ""		
},
    templateUrl: 'templates/choreDetail.html',
    controller: 'choreDetailCtrl'
  })

  .state('marketplace', {
    url: '/parent_dashboard_marketplace',
    templateUrl: 'templates/marketplace.html',
    controller: 'marketplaceCtrl'
  })

  .state('marketplaceItems', {
    url: '/parent_dashboard_marketplace_items',
    templateUrl: 'templates/marketplaceItems.html',
    controller: 'marketplaceItemsCtrl'
  })

  .state('marketplaceItemDetail', {
    url: '/parent_dashboard_marketplace_item_detail',
	params: {
		storeItemId: ""		
},
    templateUrl: 'templates/marketplaceItemDetail.html',
    controller: 'marketplaceItemDetailCtrl'
  })

  .state('openlayerTest', {
    url: '/page30',
    templateUrl: 'templates/openlayerTest.html',
    controller: 'openlayerTestCtrl'
  })

  .state('parentNotifications', {
    url: '/parent_dashboard_notifications',
    templateUrl: 'templates/parentNotifications.html',
    controller: 'parentNotificationsCtrl'
  })

  .state('addAParentOrGuardian', {
    url: '/parent_dashboard_addaparent',
    templateUrl: 'templates/addAParentOrGuardian.html',
    controller: 'addAParentOrGuardianCtrl'
  })

$urlRouterProvider.otherwise('/entrance')


});