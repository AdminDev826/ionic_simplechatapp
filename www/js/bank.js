/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('bank', ['firebase'])

.service('Bank', ['$firebaseArray', '$stateParams', function($firebaseArray, $stateParams){

    var accounts = {};
    var parent_uid = $stateParams.parent_uid;
    var ref = firebase.database().ref('users/' + parent_uid).child('bank');
    accounts = $firebaseArray(ref);

    var ret = {
        'accounts': accounts,
         deposit: function(data){
            var finalAmount = 0;
            var oldAmount = data.kidvc_balance_snapshot;
            var transactionDescription = '';
            
            if(isNaN(oldAmount) || oldAmount.length < 1){
                 finalAmount = 1;
            }else{
                 finalAmount = parseFloat(oldAmount)+parseFloat(data.depositamount);
            }
 
            if (data.reason==="null" || data.reason===null || data.reason==="" || typeof data.reason === "undefined") {
                transactionDescription = "No deposit reason provided.";
            }else{
                transactionDescription = data.reason;
            }
            firebase.database().ref('users/' + data.parent_uid + '/bank/'+ data.kidid +'/').update({
                balance: finalAmount
            });
            firebase.database().ref('users/' + data.parent_uid + '/kids/'+ data.kidid +'/').update({
                vc_balance_snapshot: finalAmount
            });
            var ref = firebase.database().ref('vc/'+data.parent_uid+'/transactions/').child(data.kidid);
            //var transactions = $firebaseArray(ref).orderByChild("datetime_invert").limitToLast(25);
            var transactions = $firebaseArray(ref);
            var invert_time = Number.MAX_SAFE_INTEGER - parseInt(Date.now());
            return transactions.$add({
                'type': 1, // 1= deposit
                'amount': data.depositamount,
                'description': transactionDescription,
                'kid_id': data.kidid,
                'kid_name': data.kidusername,
                'datetime_start': parseInt(Date.now()),
                'datetime_invert': invert_time
            });
            
            //return ret;
        }, 
        withdraw: function(data){
            var finalAmount = 0;
            var oldAmount = data.kidvc_balance_snapshot;
            var transactionDescription = '';
            
            if(isNaN(oldAmount) || oldAmount.length < 1){
                 finalAmount = 0;
            }else{
                 finalAmount = parseFloat(oldAmount)-parseFloat(data.withdrawamount);
            }
            
            //console.log("data.reason= "+data.reason);
            
            if (data.reason2==="null" || data.reason2===null || data.reason2==="" || typeof data.reason2 === "undefined") {
                transactionDescription = "No withdraw reason provided.";
            }else{
                transactionDescription = data.reason2;
            }
            
            //console.log("data.parent_uid: "+data.parent_uid+" data.kidid: "+data.kidid+" finalAmount: "+finalAmount);
            
            firebase.database().ref('users/' + data.parent_uid + '/bank/'+ data.kidid +'/').update({
                balance: finalAmount
            });
            
            firebase.database().ref('users/' + data.parent_uid + '/kids/'+ data.kidid +'/').update({
                vc_balance_snapshot: finalAmount
            });

            var ref = firebase.database().ref('vc/'+data.parent_uid+'/transactions/').child(data.kidid);
            //var transactions = $firebaseArray(ref).orderByChild("datetime_invert").limitToLast(25);
            var transactions = $firebaseArray(ref);
            var invert_time = Number.MAX_SAFE_INTEGER - parseInt(Date.now());
            return transactions.$add({
                'type': 2, // 1= deposit, 2=withdraw
                'amount': data.withdrawamount,
                'description': transactionDescription,
                'kid_id': data.kidid,
                'kid_name': data.kidusername,
                'datetime_start': parseInt(Date.now()),
                'datetime_invert': invert_time
            });
            
            //return ret;
        }
    }
    
    return ret;
    
}]);




