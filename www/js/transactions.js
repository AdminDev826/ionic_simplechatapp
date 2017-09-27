angular.module('transactions', ['firebase'])

.service('Transactions', ['$firebaseArray', '$stateParams', function($firebaseArray, $stateParams){
    var parent_uid = $stateParams.parent_uid;
    var kid_id = $stateParams.kidid;
    var ref = firebase.database().ref('vc/' + parent_uid + '/transactions/').child(kid_id).orderByChild("datetime_invert").limitToLast(50);
    var items = $firebaseArray(ref);

    var transactions = {
        'items': items
    }
    
    return transactions;
}]);    
    
/*
function Bank(parent_uid, kid_id, kid_name, kid_avatar, balance, datetime_start, datetime_lastedit){
    this.parent_uid = parent_uid;
    this.kid_id = kid_id;
    this.kid_name = kid_name;
    this.kid_avatar = kid_avatar;
    this.balance = balance;
    this.datetime_start = datetime_start;
    this.datetime_lastedit = datetime_lastedit;
}

    this.addKidFirstTime = function(){
        var bank_updates = {};
        var bankId = firebase.database().ref('users/' + this.parent_uid).child('bank').push().key;
        bank_updates['users/' + this.parent_uid + '/bank/'+this.kid_id+'/'] = this;
        return firebase.database().ref().update(bank_updates);
    }
    this.setBalance = function(oldAmount, newAmount) {
      var amount = '';
      if(oldAmount === "undefined" || oldAmount === "" || oldAmount === null){
          amount = newAmount;
      }else{
          amount = parseFloat(oldAmount)+parseFloat(newAmount);
      }
    
      firebase.database().ref('users/' + this.parent_uid + '/bank/'+this.kid_id+'/').update({
        balance: amount
      });
      firebase.database().ref('users/' + this.parent_uid + '/kids/'+this.kid_id+'/').update({
        vc_balance_snapshot: amount
      });
      return amount;
    }


Bank.prototype.addTransaction = function(trans_type, trans_amount, trans_description, trans_datetime){
    var invert_time = Number.MAX_SAFE_INTEGER - parseInt(Date.now());
    var transactionsId = firebase.database().ref('vc/' + this.parent_uid).child('transactions/').push().key;
    var bank_transaction_updates = {
        type: trans_type,
        amount: trans_amount,
        description: trans_description,
        kid_id: this.kid_id,
        kid_name: this.kid_name,
        datetime_start: trans_datetime,
        datetime_invert: invert_time
    };
    var bank_updates = {};
    bank_updates['vc/' + this.parent_uid + '/transactions/'+this.kid_id+'/'+transactionsId] = bank_transaction_updates;
    return firebase.database().ref().update(bank_updates);
}

Bank.prototype.getAllTransactions = function(howMany){
    var result = firebase.database().ref('vc/' + this.parent_uid + '/transactions/'+this.kid_id+'/').orderByChild("datetime_invert").limitToLast(howMany); //premium feature idea at this spot would be to allot for more space as the user needs it.
    return result;
}




// example of call to service function, $scope.createUser = function() {

/*
more examples

app.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
=========

var bank = new Bank(user.uid, kidId, kidUsername, kidAvatarUrl, oldAmount, rightNow, rightNow);
               //setBalance
               var newBalance = bank.setBalance(oldAmount, depositAmount);



*/








