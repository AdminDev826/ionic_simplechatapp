angular.module('chores', ['firebase'])

.service('Chores', ['$firebaseArray', '$stateParams', '$rootScope', function($firebaseArray, $stateParams, $rootScope){
    var param_parent_uid = $stateParams.parent_uid;
    var param_kidid = $stateParams.kidid;
    var ref = firebase.database().ref('users/' + param_parent_uid + '/tasks/').child(param_kidid);
    var items = $firebaseArray(ref);
    
    var chores = {
        'items': items,
        getFreshItems: function(parent_uid, kid_id){
            var ref = firebase.database().ref('users/' + parent_uid + '/tasks/').child(kid_id);
            var freshItems = $firebaseArray(ref);
            return freshItems;
        },
        addItem: function(title, description, payout, parent_uid, kid_id){
            var ref = firebase.database().ref('users/' + parent_uid + '/tasks/').child(kid_id);
            var items = $firebaseArray(ref);
            items.$add({
                'title': title,
                'description': description,
                'status': false,
                'payout': payout,
                'datetime_created': firebase.database.ServerValue.TIMESTAMP
            });
        },
        setFinished: function(item, newV){
            item.status = newV;
            items.$save(item);
        },
        updatePayout: function(item, newV){
            item.payout = newV;
            items.$save(item);
        },
        updateTitleAndDescrip: function(item, newTitle, newDescription){
            item.title = newTitle;
            item.description = newDescription;
            items.$save(item);
        }
    }
    
    return chores;
}]);

