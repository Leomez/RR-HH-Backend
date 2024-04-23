// var admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");


const serviceAccount = require("./firebaseConfig");
const app =initializeApp({
  credential: cert(serviceAccount)
});

module.exports = { app };

