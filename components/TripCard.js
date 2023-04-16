import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, getDoc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import sendSms from '../screens/sendSms'

const TripCard = (props) => {
    const date = new Date(parseFloat(props.time) * 1000); // multiply by 1000 to convert seconds to milliseconds
    const month = date.getMonth() + 1; // add 1 to convert zero-based index to one-based index
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const id = props.id;

    const [show, setShow] = useState(false)
    const navigation = useNavigation();
    const handlePress = () => {
        setShow(!show)
    }

    const smsBody = 'Another student has joined your Hitch group!\n\nYou can contact them with their number: xxxxxxxxxx\n\nHave a safe ride!';
    const numberslist = ['+17143254177','+14692376435'];
    len = numberslist.length;
    const handleSendSms = () => {
    while (len != 0) {
        sendSms(numberslist[len-1], smsBody);
        len -= 1;
    }
  }

    const handleJoinGroup = () => {
        storeData();
        navigation.navigate("Home")
        
    }

    const storeData = async () => {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log("printed: ", docSnap.data());
        if (docSnap.exists()) {
            const user = docSnap.data();
            const newTrips = user.trips;
            
            newTrips.push(props.id);
            await updateDoc(docRef, {
                trips: newTrips
            });
        }

        const tripRef = doc(db, "Trips", props.id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
            const trip = tripSnap.data();
            const newRiders = trip.users;
            const curNum = trip.numOfUsers;
            newRiders.push(auth.currentUser.uid);
            await updateDoc(tripRef, {
                users: newRiders,
                numOfUsers: curNum + 1,
            });
        }
    }


  return (
    <View className='border mb-2'>
        <TouchableOpacity onPress={() => handlePress()}>
            <Text>Destination: {props.destination}</Text>
            <Text>Pickup Location: {props.pickup}</Text>
            <Text>Leaving On: {month}/{day} at {time}</Text>
        </TouchableOpacity>
        {show && (
            <TouchableOpacity
            onPress={() => {handleJoinGroup();handleSendSms()}}
            >
                <Text>Join Trip</Text>
            </TouchableOpacity>
        )}
      
    </View>
  )
}

export default TripCard