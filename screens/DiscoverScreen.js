import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp, onSnapshot} from "firebase/firestore"
import { auth, db, getMatchingTrips } from '../firebase'
import TripCard from '../components/TripCard';
import moment from 'moment';
import firebase from 'firebase/app';

const DiscoverScreen = ({ route }) => {

    // Get the params from the Add Trip Scren
    const { time, flexibility, date, destination, pickup } = route.params;
    console.log(time)
    console.log(flexibility)
    console.log(date)
    console.log(destination)
    console.log(pickup)
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

    const [month, day, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const period = minute.slice(-2);
    const isPM = (period === 'PM');
    console.log(isPM)
    // Convert the string components into numbers
    const numericMonth = parseInt(month, 10) - 1; // Month is zero-based in JavaScript's Date object
    const numericDay = parseInt(day, 10);
    const numericYear = parseInt(year, 10);
    let numericHour = parseInt(hour, 10);

    // Adjust the hour for PM if necessary
    if (isPM && numericHour < 12) {
    numericHour += 12;
    }

    // Create a JavaScript Date object
    const dateObject = new Date(numericYear, numericMonth, numericDay, numericHour, parseInt(minute, 10));
    console.log(numericYear, numericMonth, numericDay, numericHour, parseInt(minute, 10));
    const timestamp = Timestamp.fromDate(dateObject);
    console.log(JSON.stringify(timestamp));

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