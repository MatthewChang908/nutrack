import {
  Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { 
    doc,
    getDoc,
    updateDoc,
    Timestamp
} from "firebase/firestore";
import {
  HomeIcon,
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
import TripCard from '../components/TripCard';
import firebase from 'firebase/app';
import JoinedTripCard from '../components/JoinedTripCard'

const HomeScreen = () => {
    const { destination, pickup } = useState();
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [hasTrips, setHasTrips] = useState(false);
    const [trips, setTrips] = useState([]);
    console.log(auth.currentUser.uid)
    // const getTripId = useCallback(async () => {
    //     //docRef is the reference for the document, db = firestore, 
    //     //'Users' is the collection, userId is the current user
         
        
    //     if (docSnap.exists()) {
    //         const tripIds = docSnap.data().trips;
    //         setHasTrips(trips.length > 0);
    //         setTripIds(tripIds);
    //         console.log(tripIds);
    //         return tripIds;
    //     }
    // });

    const getTrips = async () => {
        // Get all the trip that the user has
        const docRef = doc(db, 'Users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const tripIds = docSnap.data().trips;
            setHasTrips(tripIds.length > 0);

            const newTrips = [];

            for (const tripId of tripIds) {
                const docRef = doc(db, 'Trips', tripId);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {

                    newTrips.push(docSnap.data());
                }
            }
            setTrips(newTrips);
        }        
    };

    useEffect(() => {
        getTrips();
    }, []);

  return (
    <SafeAreaView className='flex-1 justify-between bg-white'>
        {hasTrips && (
            <View>
                <View className='flex mt-8 items-center justify-center'>
                    <Text className='text-black text-2xl font-lg'>
                        Hi {auth.currentUser.displayName}
                    </Text>
                    
                    <Text className="text-black text-l font-lg">
                        Your Trips
                    </Text>
                </View>


                <View>
                <ScrollView className='w-full h-6/7'>
                    <View className='flex mt-8 items-center justify-center'>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('AddTrip')} 
                        className="bg-black w-10/12 self-center h-10 rounded-md justify-center">
                        <Text className='text-white text-center text-lg'>Find Trip</Text>
                    </TouchableOpacity> 
                    </View>
                    {trips.map((trip, index) => {
                        // const { seconds, nanoseconds } = trip.time;
                        // const timeString = `${seconds}.${nanoseconds}`;
                        return (
                        <View className='items-center mx-6 mt-4' key={trip.id}>
                            <JoinedTripCard
                            key={index}
                            destination={trip.destination}
                            pickup={trip.pickup}
                            riders={trip.riderRefs}
                            // time={time}
                            />
                        </View>
                        );
                        })}
                </ScrollView>
                </View>
            </View>
        )}
        {!hasTrips && (
            <View className='flex-1 justify-center items-center'>
                <Text className="text-black text-2xl font-lg">
                    Hi {auth.currentUser.displayName}!
                </Text>
                
                <Text className="text-xl font-light mt-4 mb-3">
                    You have no planned trips
                </Text>

                <TouchableOpacity 
                    className='bg-black w-10/12 self-center h-12 mt-4 rounded-md justify-center'
                    onPress={() => navigation.navigate("AddTrip")}>
                    <Text className="text-white text-center text-xl font-lg">
                        Join / Create
                    </Text>
                </TouchableOpacity>

                {/* <Image
                source={require("../assets/map.png")}
                className="flex justify-between w-80 h-40 ml-10 mt-32 mb-16"
                /> */}
              
            </View>
        )}

        <View className='flex-row justify-between px-10'>
            <TouchableOpacity
            className="items-center w-1/3"
            onPress={() => navigation.navigate("Home")}>
            <HomeIcon color={"#000000"} size={40} />
            <Text>Home</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity className='items-center w-1/4'
                onPress={() => navigation.navigate("DiscoverScreen")}>
                <MagnifyingGlassCircleIcon color={"#000000"} size={40}/>
                <Text>Find Group</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
            className="items-center w-1/3"
            onPress={() => navigation.navigate("Profile")}>
            <UserCircleIcon color={"#000000"} size={40} />
            <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
