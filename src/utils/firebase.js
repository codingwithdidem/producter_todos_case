import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5d2g37O-8wYzhIuJJiQSbKXvrWZrKUo0",
  authDomain: "todoscase.firebaseapp.com",
  projectId: "todoscase",
  storageBucket: "todoscase.appspot.com",
  messagingSenderId: "498286604785",
  appId: "1:498286604785:web:a4d9f0e6028c7a2f1ed450",
  measurementId: "G-1GJ32N4QB6",
};

let app;
let analytics;
let database;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
}

export { app, database };
