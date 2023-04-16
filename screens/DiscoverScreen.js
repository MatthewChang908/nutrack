import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp} from "firebase/firestore"
import { auth, db } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = ({route}) => {
    //default values for {date, time}
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    if (route.params){
        setDate(route.params.date);
        setTime(route.params.time);
    }

    const navigation = useNavigation()
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

    // Extract the time from the time variable
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Extract the date from the date variable and format it as a string
    const day = date.toLocaleDateString();

    // Create the start and end timestamps
    const startTimestamp = new Timestamp.fromMillis(
      date.setHours(hours, minutes, 0, 0) // set the time to the specified hours and minutes
    );
    const endTimestamp = new Timestamp.fromMillis(
      date.setHours(hours + 1, minutes, 0, 0) // set the end time to one hour after the specified time
    );

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

    const getDataWithinTime = async () => {
      // Query the collection for documents within the specified time range
      const q = query(
        collection(db, "Trips"),
        where("time", ">=", startTimestamp),
        where("time", "<", endTimestamp)
      );
      const querySnapshot = await getDocs(q);
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

    const printDateTime = () => {
      console.log('Start Date:', day);
      console.log('End Date:', hours, minutes);
    }
    const printTrips  = () => {
      console.log('Trips:', trips);
    }

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
                    id={trip.id}
                    hasButton={false}
                    />
                );
                })}
          <View>
            <Text className='text-4xl font-bold text-center mt-4'>Discover</Text>
          </View>
            <ScrollView className='w-10/12'>
              {trips.map((trip, index) => {
                  const { seconds, nanoseconds } = trip.time;
                  const timeString = `${seconds}.${nanoseconds}`;
                  return (
                    <View className='w-full'>
                      <TripCard className=''
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
            <TouchableOpacity
            onPress={() => printDateTime()}>
              <Text>Print Date and Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => printTrips()}>
              <Text>Print Trips</Text>
            </TouchableOpacity>

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