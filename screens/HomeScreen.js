import { Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

//const userId = auth.currentUser.uid;

const HomeScreen = () => {
    const navigation = useNavigation();
    const [hasTrips, SetHasTrips] = useState(false);

    // useEffect(() => {
    //     const getTripId = async () => {
    //         //docRef is the reference for the document, db = firestore, 
    //         //'Users' is the collection, userId is the current user
    //         const docRef = doc(db, 'Users', userId);
    //         const docSnap = await getDoc (docRef);
            
    //         if (docSnap.exists()) {
    //             return docSnap.data.trips;
    //         }
    //         else {
    //             return null;
    //         }
    //     };

    //     // check if the user has any trips in the trip array
    //     getTripId.then((trips) => {
    //         if (trips) {
    //             SetHasTrips(true);
    //         }
    //     }).catch(console.error);
    // });


  return (
    <SafeAreaView className='flex-1 justify-between bg-white '>
        <View className='flex-1 justify-center items-center mt-32'>
            <Text className="text-black text-4xl font-lg">Hi, {auth.currentUser.displayName}</Text>
            
            <Text className="text-black text-2xl font-lg">You have no planned trips</Text>
            <TouchableOpacity className='bg-white w-10/12 h-12 mt-4 rounded-md items-center justify-center  border-black border-2'
            onPress={() => navigation.navigate("AddTrip")}>
                <Text className="text-black text-lg font-lg">Join/Create a Trip</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity className='bg-black w-10/12 h-12 mt-4 rounded-md items-center justify-center'
            onPress={() => navigation.navigate("DiscoverScreen")}>
                <Text className="text-white text-lg font-lg">Join an Existing Trip</Text>
            </TouchableOpacity> */}
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