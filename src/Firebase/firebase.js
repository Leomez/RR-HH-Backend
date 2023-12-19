var admin = require("firebase-admin");

var serviceAccount = require("./firebaseConfig");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = { admin };