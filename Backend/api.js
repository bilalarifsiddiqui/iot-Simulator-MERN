const express = require("express");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");

//connect to firebase
const serviceAccount = require("./iot-dashboard-mern-firebase.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://iot-dashboard-mern-default-rtdb.firebaseio.com",
});

const app = express();
app.use(cors());

//fetch status
app.get("/status", async (req, res) => {
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
app.get("/history", async (req, res) => {
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

// your desired port number
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
