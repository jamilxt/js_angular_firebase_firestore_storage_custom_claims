const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// for sending email:
// 1. enable access to less secure apps:
// https://www.google.com/settings/security/lesssecureapps
// 2. Display Unlock Captcha:
// https://accounts.google.com/DisplayUnlockCaptcha
// For a gmail account with 2-step verification enabled, you will need to use
// an app password
//  https://support.google.com/accounts/answer/185833
