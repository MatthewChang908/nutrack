import { Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { 
    doc,
    getDoc,
} from "firebase/firestore";
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

const userId = auth.currentUser.uid;

const HomeScreen = () => {
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [hasTrips, setHasTrips] = useState(false);
    const [trips, setTrips] = useState([]);

    const getTripId = useCallback(async () => {
        //docRef is the reference for the document, db = firestore, 
        //'Users' is the collection, userId is the current user
        const docRef = doc(db, 'Users', userId);
        const docSnap = await getDoc(docRef);  
        
        if (docSnap.exists()) {
            return docSnap.data().trips;
        }
        else {
            return null;
        }
    });

    const getTrips = useCallback(async (tripIds) => {
        tripIds.forEach(async function(tripId) {
            const docRef = doc(db, 'Trips', tripId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setTrips([trips, docSnap.data()]);
            }
        });
    });

    useEffect(() => {
        // check if the user has any trips in the trip array
        getTripId()
        .then((trips) => {
            if (trips.length > 0) {
                setHasTrips(true);
                getTrips(trips);
            }
        }).catch(console.error);
    }, [getTripId, trips]);

  return (
    <SafeAreaView className='flex-1 justify-between'>
        <View className='flex-1 justify-center items-center'>
            <Text>Hi, {auth.currentUser.displayName}</Text>
            
            <Text className="text-black text-2xl font-lg">You have no planned trips</Text>
            <TouchableOpacity className='bg-white w-10/12 h-12 mt-4 rounded-md items-center justify-center  border-black border-2'
            onPress={() => navigation.navigate("AddTrip")}>
                <Text className="text-black text-lg font-lg">Start a Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-black w-10/12 h-12 mt-4 rounded-md items-center justify-center'
            onPress={() => navigation.navigate("DiscoverScreen")}>
                <Text className="text-white text-lg font-lg">Join an Existing Trip</Text>
            </TouchableOpacity>
        </View>

        <Image 
        source={require('../assets/map.jpeg')}
        className='w-80 h-40 ml-12 mt-48 mb-12'
       />

        <View className='flex-row justify-between px-10'>
            <TouchableOpacity className='items-center w-1/4'
             onPress={() => navigation.navigate("DiscoverScreen")}>
                <MagnifyingGlassCircleIcon color={"#000000"} size={40}/>
                <Text>Find Group</Text>
            </TouchableOpacity>

            <TouchableOpacity className='items-center w-1/4'
            onPress={() => navigation.navigate("Home")}>
                <HomeIcon color={"#000000"} size={40}/>
                <Text>Home</Text>
            </TouchableOpacity>


            <TouchableOpacity className='items-center w-1/4'
            onPress={() => navigation.navigate("Profile")}>
                <UserCircleIcon color={"#000000"} size={40}/>
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>

            
    </SafeAreaView>
  )
}

export default HomeScreen