import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import {doc, getDoc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"
import { auth, db } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = ({route}) => {

    const {date, time} = route.params;
    const navigation = useNavigation()
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

  // Extract the time from the time variable
  const hours = time.getHours();
  const minutes = time.getMinutes();

  // Extract the date from the date variable and format it as a string
  const day = date.toLocaleDateString();

  // Create a new Date object with the same date as the date variable and the extracted time
  const start = new Date(`${day} ${hours}:${minutes}:00`);

  // Calculate the end time as 1 hour after the start time
  const end = new Date(start.getTime() + (60 * 60 * 1000));

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
      const q = query(
        collection(db, "Trips"),
        where("time", ">=", start),
        where("time", "<", end)
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

    return (

    <SafeAreaView className= 'flex-1 justify-between'>
        <View>
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