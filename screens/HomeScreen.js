import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
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
    const [hasTrips, SetHasTrips] = useState(false);

    useEffect(() => {
        const getTripId = async () => {
            //docRef is the reference for the document, db = firestore, 
            //'Users' is the collection, userId is the current user
            const docRef = doc(db, 'Users', userId);
            const docSnap = await getDoc (docRef);
            
            if (docSnap.exists()) {
                return docSnap.data.trips;
            }
            else {
                return null;
            }
        };

        // check if the user has any trips in the trip array
        getTripId.then((trips) => {
            if (trips) {
                SetHasTrips(true);
            }
        }).catch(console.error);
    });


  return (
    <SafeAreaView className='flex-1 justify-between'>
        <View className='flex-1 justify-center items-center'>
            <Text>Hi, {auth.currentUser.displayName}</Text>
            
            <Text>You have no planned trips</Text>
            <TouchableOpacity className='bg-blue-200 p-2 rounded-md'
            onPress={() => navigation.navigate("AddTrip")}>
                <Text>Add Trip</Text>
            </TouchableOpacity>
    
        </View>
        <View className='flex-row justify-between px-10'>
            <TouchableOpacity className='items-center'
             onPress={() => navigation.navigate("Home")}>
                <MagnifyingGlassCircleIcon />
                <Text>Find Group</Text>
            </TouchableOpacity>

            <TouchableOpacity className='items-center'
            onPress={() => navigation.navigate("Home")}>
                <HomeIcon />
                <Text>Home</Text>
            </TouchableOpacity>


            <TouchableOpacity className='items-center'
            onPress={() => navigation.navigate("Profile")}>
                <UserCircleIcon />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>

            
    </SafeAreaView>
  )
}

export default HomeScreen