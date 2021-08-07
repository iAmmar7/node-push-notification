const path = require("path");
const express = require("express");
const webPush = require("web-push");
require("dotenv").config();

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(express.json());

const publicVapidKey = process.env.VAPID_KEY_PUBLIC;
const privateVapidKey = process.env.VAPID_KEY_PRIVATE;

webPush.setVapidDetails("mailto:maansaridot@gmail.com", publicVapidKey, privateVapidKey);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subsccription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webPush.sendNotification(subsccription, payload).catch((error) => console.error(error));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.info(`Server started on port ${port}`));
