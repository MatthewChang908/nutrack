// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, query, where, onSnapshot, setDoc, doc, arrayUnion, addDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQupBx464hciIpJXuZX9gkmck8bmcYyNo",
    authDomain: "nutrack-ff4cd.firebaseapp.com",
    databaseURL: "https://nutrack-ff4cd-default-rtdb.firebaseio.com",
    projectId: "nutrack-ff4cd",
    storageBucket: "nutrack-ff4cd.appspot.com",
    messagingSenderId: "635113709433",
    appId: "1:635113709433:web:34efa1f4492de0c9c899a8",
    measurementId: "G-C48RGQH19B"
};
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);

// function for getting trips based on attributes
const getMatchingTrips = (lbTimeStamp, ubTimeStamp, destination, pickup, snapshot, error) => {
    // create reference to the Trips collection
    const tripsRef = collection(db, "Trips");

    // Create a query object based on search criteria
    // TODO: consider when criteria are optional
    // TODO: consider adding conditional to not display trips that don't have available seats
    const q = query(
        tripsRef, 
        where("destination", "==", destination),
        where("time", ">=", lbTimeStamp),
        where("time", "<=", ubTimeStamp),
        where("pickup", "==", pickup),
    );

    return onSnapshot(q, snapshot, error);
}

// function for creating new trips
const addNewTrip = async (userId, time, flexibility, destination, pickup) => {
    try {
        // Create trip document
        const tripDocRef = await addDoc(collection(db, "Trips"), {
            time: time,
            flexibility: flexibility,
            destination: destination,
            pickup: pickup,
            riderRefs: [doc(db, "Users", userId)],
        });
        // Add trip to user document
        await updateDoc(doc(db, "Users", userId), {
            trips: arrayUnion(tripDocRef.id),
        })
    } catch (e) {
        console.error(e);
    }
}


export {auth, database, app, db, getMatchingTrips, addNewTrip };