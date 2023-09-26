import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHpi2YmFTM-gVzE0JIAZnd0iDqMe4nYLE",
  authDomain: "discord-clone-1714e.firebaseapp.com",
  projectId: "discord-clone-1714e",
  storageBucket: "discord-clone-1714e.appspot.com",
  messagingSenderId: "953136402758",
  appId: "1:953136402758:web:e342b56c978447e0719547",
};
 
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;