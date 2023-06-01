const functions = require("firebase-functions");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");

//connect to firebase
// const serviceAccount = require("../iot-dashboard-mern-firebase.json");
firebaseAdmin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 30,
  memory: "256MB",
};

//fetch status
exports.getStatus = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    try {
      const snapshot = await firebaseAdmin
        .database()
        .ref("status")
        .limitToLast(1)
        .once("value");
      const status = snapshot.val();
      res.json(Object.values(status));
    } catch (error) {
      //Error Handling
      console.error("Error fetching status:", error);
      res.status(500).json({ error: "Failed to fetch status" });
    }
  });

//fetch History
exports.getHistory = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    try {
      //connect to firebase
      const snapshot = await firebaseAdmin.database().ref("status").once("value");
      const history = snapshot.val();
      res.json(Object.values(history).reverse());
    } catch (error) {
      //Error Handling
      console.error("Error fetching status history:", error);
      res.status(500).json({ error: "Failed to fetch status history" });
    }
  });
