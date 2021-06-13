"use strict";

var admin = require("firebase-admin");

var serviceAccount = require("./masroufna-com-firebase-adminsdk-1gzky-6d580b39bf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://masroufna-com.firebaseio.com"
});
var fcm = admin.messaging();
var db = admin.database();
var ref = db.ref('notifi');
setInterval(function () {
  var toToken = "";
  ref.on('value', function (snapshot) {
    snapshot.forEach(function (Element) {
      toToken = Element.val()["noty"];

      if (toToken != "") {
        fcm.sendToDevice(toToken, admin.messaging.MessagingPayload = {
          notification: {
            title: "Account Deposit",
            body: "A deposit to your savings account has just cleared."
          }
        }).then(function () {
          console.log("done" + Element.val()["noty"].toString());
        })["catch"](function () {
          console.log("Error Occured");
        });
      }

      toToken = "";
      ref.child(Element.key.toString()).remove();
    });
  });
}, 3000);