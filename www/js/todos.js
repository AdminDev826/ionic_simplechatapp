angular.module('todos', ['firebase'])

.service('Todos', ['$firebaseArray', function($firebaseArray){
    
    var ref = firebase.database().ref().child('todos');
    var items = $firebaseArray(ref);
    
    var todos = {
        'items': items,
        addItem: function(title){
            items.$add({
                'title': title,
                'finished': false
            });
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    
    return todos;

}]);