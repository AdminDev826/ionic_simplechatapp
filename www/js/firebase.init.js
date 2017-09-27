angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtcQ69StTPgqklJvbDhXwf_lBEf5XxltE",
    authDomain: "gb-board.firebaseapp.com",
    databaseURL: "https://gb-board.firebaseio.com",
    storageBucket: "gb-board.appspot.com",
    projectId: "gb-board",
    messagingSenderId: "6651342894"
    
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/