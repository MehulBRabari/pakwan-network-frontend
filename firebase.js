
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "tastetrail-6dfca.firebaseapp.com",
//   projectId: "tastetrail-6dfca",
//   storageBucket: "tastetrail-6dfca.firebasestorage.app",
//   messagingSenderId: "30033373442",
//   appId: "1:30033373442:web:be47dc754ea0a898d43a1b",
//   measurementId: "G-048WPVFTNC"
// };

// const app = initializeApp(firebaseConfig);
// const auth=getAuth(app)
// export {app,auth};
// const analytics = getAnalytics(app);








// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "food-9733d.firebaseapp.com",
//   projectId: "food-9733d",
//   storageBucket: "food-9733d.firebasestorage.app",
//   messagingSenderId: "830143544716",
//   appId: "1:830143544716:web:00175a90c751e497332aa9",
//   measurementId: "G-DBHCEZYW64"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth=getAuth(app)
// export {app,auth};
// const analytics = getAnalytics(app);




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth};
const analytics = getAnalytics(app);