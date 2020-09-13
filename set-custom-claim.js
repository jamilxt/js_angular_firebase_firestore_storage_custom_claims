var admin = require("firebase-admin");
var uid = process.argv[2];

var serviceAccount = require("./fir-practice-18187-firebase-adminsdk-zo2s4-23b0782706.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-practice-18187.firebaseio.com",
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("custom claims set for user", uid);
  })
  .catch((error) => {
    console.log("error", error);
    process.exit(1);
  });
