import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"
import { auth, db } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = () => {
    const navigation = useNavigation()
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "Trips"));
      const newTrips = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        // add doc.data() to newTrips
        newTrips.push({ id: doc.id, ...doc.data() });

      });
      // update the state with newTrips
      setTrips(newTrips);
    };
 
    useEffect(() => {
        getData().then(() => {
            console.log('Trips:', trips);
        }).catch((error) => {
          console.error('Error getting data:', error);
        });
      }, []);

    return (

    <SafeAreaView className= 'flex-1 justify-between'>
        <View>
            <Text>DiscoverScreen</Text>
            <TouchableOpacity onPress={() => console.log(trips)}>
                <Text>Print Trips</Text>
            </TouchableOpacity>
            <Text>{trips.length}</Text>
            {trips.map((trip, index) => {
                const { seconds, nanoseconds } = trip.time;
                const timeString = `${seconds}.${nanoseconds}`;
                return (
                    <TripCard
                    key={index} // don't forget to add a unique key to each child element when rendering an array
                    destination={trip.destination}
                    pickup={trip.pickup}
                    time={timeString}

                    />
                );
                })}

        </View>

        <View className = 'flex-row justify-between px-10'>
            <TouchableOpacity className='items-center'
            onPress={() => navigation.navigate("DiscoverScreen")}>
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

export default DiscoverScreen