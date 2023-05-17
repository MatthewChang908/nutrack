import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp} from "firebase/firestore"
import { auth, db } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = ({ route }) => {

    // Get the params from the Add Trip Scren
    const { time, destination, pickup } = route.params;
    console.log(time)
    console.log(destination)
    console.log(pickup)
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

    // // Extract the time from the time variable
    // const hours = time.getHours();
    // const minutes = time.getMinutes();

    // // Extract the date from the date variable and format it as a string
    // const day = date.toLocaleDateString();

    // // Create the start and end timestamps
    // const startTimestamp = new Timestamp.fromMillis(
    //   date.setHours(hours, minutes, 0, 0) // set the time to the specified hours and minutes
    // );
    // const endTimestamp = new Timestamp.fromMillis(
    //   date.setHours(hours + 1, minutes, 0, 0) // set the end time to one hour after the specified time
    // );

    const getMatchingTrips = async () => {
      // create reference to the Trips collection
      const tripsRef = collection(db, "Trips");

      // Create a query object based on search criteria
      // TODO: consider when criteria are optional
      // TODO: consider adding conditional to not display trips that don't have available seats
      const q = query(
        tripsRef, 
        where("destination", "==", destination),
        where("time", "==", time),
        where("pickup", "==", pickup),
      );

      const newTrips = [];

      // Execute the query
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        // add doc.data() to newTrips
        newTrips.push({ id: doc.id, ...doc.data() });

      });
      // update the state with newTrips
      setTrips(newTrips);
    };

    // const getDataWithinTime = async () => {
    //   // Query the collection for documents within the specified time range
    //   const q = query(
    //     collection(db, "Trips"),
    //     where("time", ">=", startTimestamp),
    //     where("time", "<", endTimestamp)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   const newTrips = [];
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     // add doc.data() to newTrips
    //     newTrips.push({ id: doc.id, ...doc.data() });
    //   });
    //   // update the state with newTrips
    //   setTrips(newTrips);
    // };

 
    useEffect(() => {
        getMatchingTrips().then(() => {
            console.log('Trips:', trips);
        }).catch((error) => {
          console.error('Error getting data:', error);
        });
      }, []);

    // const printDateTime = () => {
    //   console.log('Start Date:', day);
    //   console.log('End Date:', hours, minutes);
    // }
    // const printTrips  = () => {
    //   console.log('Trips:', trips);
    // }

    return (

    <SafeAreaView className= 'flex-1 justify-between'>
        <View>
          <View>
            <Text className='text-2xl font-normal text-center mt-4'>
              {pickup} to {destination}
            </Text>
            <Text className='text-xs font-normal text-center'>
              2:30-3:30pm Thu May 11
            </Text>
          </View>
          <ScrollView className='w-full mt-6'>
            {trips.map((trip, index) => {
                const { seconds, nanoseconds } = trip.time;
                const timeString = `${seconds}.${nanoseconds}`;
                return (
                  <View className='items-center mx-6 mt-4'>
                    <TripCard
                    key={index}
                    destination={trip.destination}
                    pickup={trip.pickup}
                    time={timeString}
                    id={trip.id}
                    />
                  </View>
                );
                })}
          </ScrollView>
        </View>

        <View className="flex-row justify-between px-10">
        <TouchableOpacity
          className="items-center w-1/4"
          onPress={() => navigation.navigate("DiscoverScreen")}
        >
          <MagnifyingGlassCircleIcon color={"#000000"} size={40} />
          <Text>Find Group</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-1/4"
          onPress={() => navigation.navigate("Home")}
        >
          <HomeIcon color={"#000000"} size={40} />
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-1/4"
          onPress={() => navigation.navigate("Profile")}
        >
          <UserCircleIcon color={"#000000"} size={40} />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    
  )
}

export default DiscoverScreen