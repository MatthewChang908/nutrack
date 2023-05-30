import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, getDoc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import PassengersScreen from '../screens/PassengersScreen'

const TOTAL_SEATS = 4

const JoinedTripCard = (props) => {
    const date = new Date(parseFloat(props.time) * 1000); // multiply by 1000 to convert seconds to milliseconds
    const month = date.getMonth() + 1; // add 1 to convert zero-based index to one-based index
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const id = props.id;
    const destination = props.destination;
    const pickup = props.pickup;
    const riders = props.riders;
    const [show, setShow] = useState(true)
    const navigation = useNavigation();
    const handlePress = () => {
        setShow(!show)
    }
    const getMonth = () => {
        month
    }
    const getDay = () => {
        day
    }
    const getTime = () => {
        time
    }

    const handleDetails = () => {
        navigation.navigatekla("PassengersScreen", { 
            destination: destination,
            pickup: pickup,
            riders: riders
        })

    } 
    // const handleJoinGroup = () => {
    //     storeData();
    //     navigation.navigate("Home")
    // }

    // const storeData = async () => {
    //     const docRef = doc(db, "Users", auth.currentUser.uid);
    //     const docSnap = await getDoc(docRef);
    //     console.log("printed: ", docSnap.data());
    //     if (docSnap.exists()) {
    //         const user = docSnap.data();
    //         const newTrips = user.trips;
            
    //         newTrips.push(props.id);
    //         await updateDoc(docRef, {
    //             trips: newTrips
    //         });
    //     }

    //     const tripRef = doc(db, "Trips", props.id);
    //     const tripSnap = await getDoc(tripRef);
    //     if (tripSnap.exists()) {
    //         const trip = tripSnap.data();
    //         const newRiders = trip.users;
    //         const curNum = trip.numOfUsers;
    //         newRiders.push(auth.currentUser.uid);
    //         await updateDoc(tripRef, {
    //             users: newRiders,
    //             numOfUsers: curNum + 1,
    //         });
    //     }
    // }


  return (
    <View className='border-2 mb-2 px-4 py-4 rounded-2xl w-full'>
        <View className='flex-row flex justify-between'>
            <Text className='text-lg text-right font-normal'>
                {/* {getMonth()} {getDay()} */}
                Thu May 11
            </Text>
            <Text className='text-lg text-left font-normal'>
                {/* {getTime()} @ {props.destination} */}
                3pm @ {props.destination}
            </Text>
        </View>
        <View className='flex justify-between items-center my-5 no-wrap w-full'>
            <Text className='text-lg font-normal'>
                {props.riders.length} / 4 Seat Filled
            </Text>
            {/* {props.riders.map((rider) => {
                return <Text key={rider.id}>{rider.userName} </Text>
            })} */}
        </View>
        
        <View className="flex-row flex justify-between mt-2">
            <TouchableOpacity
                className="w-1/3 bg-black py-2 rounded "
                onPress={() => {handleDetails()}}
            >
                <Text className="text-white font-bold text-center">Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="w-1/3 bg-black py-2 rounded "
                // onPress={() => {handleJoinGroup()}}
            >
                <Text className="text-white font-bold text-center">Cancel</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default JoinedTripCard