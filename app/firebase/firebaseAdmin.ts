import firebaseAdmin from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";

// FIREBASE_SERVICE_ACCOUNT is needed for initializing firebaseAdmin in code below
// https://firebase.google.com/docs/admin/setup#initialize_the_sdk
if (getApps().length === 0) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT env variable is missing!");
  }
  firebaseAdmin.initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

export { firebaseAdmin };
