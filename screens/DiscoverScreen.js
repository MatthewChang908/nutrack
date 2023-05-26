import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp} from "firebase/firestore"
import { auth, db } from '../firebase'
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