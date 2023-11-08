import * as dotenv from 'dotenv';
dotenv.config();

export default {
    firebaseConfig: {
        apiKey: process.env.DB_API_KEY,
        authDomain: "rememberme-database.firebaseapp.com",
        projectId: "rememberme-database",
        storageBucket: "rememberme-database.appspot.com",
        messagingSenderId: "773885761161",
        appId: "1:773885761161:web:592197f93d6b8a9c179858",
        measurementId: "G-C04M7527LF"
      }
};