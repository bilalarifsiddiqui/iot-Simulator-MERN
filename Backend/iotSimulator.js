const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./iot-dashboard-mern-firebase.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://iot-dashboard-mern-default-rtdb.firebaseio.com",
});

const db = firebaseAdmin.database();
const statusRef = db.ref("status");

setInterval(() => {
  //dd-mm-yyyy hh:mm:ss
  const timestamp = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const randomData = {
    temperature: Math.floor(Math.random() * 100),
    humidity: Math.floor(Math.random() * 100),
  };
  statusRef.push({ timestamp, ...randomData });
  console.log("connected", randomData);
}, 5000);
