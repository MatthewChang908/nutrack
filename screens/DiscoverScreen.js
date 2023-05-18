import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp, onSnapshot} from "firebase/firestore"
import { auth, db, getMatchingTrips } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = ({ route }) => {

    // Get the params from the Add Trip Screen
    const { destination, pickup } = route.params;
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

    // const getMatchingTrips = async () => {
    //   // create reference to the Trips collection
    //   const tripsRef = collection(db, "Trips");

    //   // Create a query object based on search criteria
    //   // TODO: consider when criteria are optional
    //   // TODO: consider adding conditional to not display trips that don't have available seats
    //   const q = query(
    //     tripsRef, 
    //     where("destination", "==", destination),
    //     // where("time", "==", time),
    //     // where("pickup", "==", pickup),
    //   );

    //   const newTrips = [];

    //   // Execute the query
    //   // Using real time updates with listener
    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       // add doc.data() to newTrips
    //       newTrips.push({ id: doc.id, ...doc.data() });
    //     });
    //   });

    //   // update the state with newTrips
    //   return newTrips;
    // };

    const getRiders = (async (all_trips) => {

      //Promise.all is used to await the completion of all the asynchronous operations within the map functions. 
      //The outer Promise.all wraps the mapping of trips, and the inner Promise.all wraps the mapping of trip.users.
      const updatedTrips = await Promise.all(
        all_trips.map(async (trip) => {
          // create a copy of the current trip
          const copy = {...trip};
          const riders = [];

          // Find the names of the users that joined the trip
          // note for each doesn't work with async, map or traditional for loop works
          await Promise.all(
            trip.users.map(async (userId) => {
              const userDocRef = doc(db, "Users", userId);
              const docSnapshot = await getDoc(userDocRef);

              if (docSnapshot.exists()) {
                riders.push(docSnapshot.data());
              }
            })
          );

          copy.riders = riders
          return copy;
        })
      );

      return updatedTrips;
    });

 
  useEffect(() => {
    const unsubscribe = getMatchingTrips(destination, pickup, 
      async (snapshot) => {
        const newTrips = [];
        await Promise.all(
          // might be better to just store user names in trips documents to improve performance
          snapshot.docs.map(async (doc) => {
            const riders = [];
            await Promise.all(
              doc.data().riders.map(async (rider) => {
                const docSnapshot = await getDoc(rider);

                if (docSnapshot.exists()) {
                  riders.push({id: docSnapshot.id, ...docSnapshot.data()});
                }
              })
            );
            newTrips.push({ id: doc.id, ...doc.data(), riders: riders})
          })
        );
        setTrips(newTrips);
      },
      (error) => setError('Error fetching matching trips')
    );

    return unsubscribe;
  }, [destination, pickup, setTrips]);

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
            {trips.map((trip) => {
                // const { seconds, nanoseconds } = trip.time;
                // const timeString = `${seconds}.${nanoseconds}`;
                return (
                  <View className='items-center mx-6 mt-4' key={trip.id}>
                    <TripCard
                      destination={trip.destination}
                      pickup={trip.pickup}
                      riders={trip.riders}
                      // time={time}
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