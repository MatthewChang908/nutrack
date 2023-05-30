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
  } from "firebase/firestore";
  import {
    HomeIcon,
    UserCircleIcon,
    MagnifyingGlassCircleIcon,
  } from "react-native-heroicons/outline";
  import TripCard from '../components/TripCard';
  import PassengersCard from "../components/PassengersCard";
  
  
  const PassengersScreen = ({route}) => {
      const { destination,pickup,riders } = route.params;
      const navigation = useNavigation();
      const userId = auth.currentUser.uid;
      const [hasTrips, setHasTrips] = useState(false);
      const [trips, setTrips] = useState([]);
      console.log(riders)

  
    //   const getTrips = async () => {
    //       // Get all the trip that the user has
    //       const docRef = doc(db, 'Users', userId);
    //       const docSnap = await getDoc(docRef);
  
    //       if (docSnap.exists()) {
    //           const tripIds = docSnap.data().trips;
    //           setHasTrips(tripIds.length > 0);
  
    //           const newTrips = [];
  
    //           for (const tripId of tripIds) {
    //               const docRef = doc(db, 'Trips', tripId);
    //               const docSnap = await getDoc(docRef);
      
    //               if (docSnap.exists()) {
  
    //                   newTrips.push(docSnap.data());
    //               }
    //           }
    //           setTrips(newTrips);
    //       }        
    //   };
  
    //   useEffect(() => {
    //       getTrips();
    //   }, []);
  
    return (
      <SafeAreaView className='flex-1 justify-between bg-white'>
        <TouchableOpacity className='m-8 mb-0'onPress={() => navigation.navigate("Home")}>
            <Image source={require('../assets/back.png')}/>
        </TouchableOpacity>
        <Text className="text-black text-2xl font-lg">
            Group Details
        </Text>
        <View className='border-2 mb-2 px-4 py-4 rounded-2xl w-full'>
            <View className='flex-row flex justify-between'>
                <Text className='text-lg font-normal'>
                    Macky
                </Text>
            </View>
            <View className='flex-row flex justify-between'>
                <Text className='text-lg font-normal'>
                    Northwestern University
                </Text>
            </View>
        </View>
            {/* <View className='items-center mx-6 mt-4' key={trip.id}>
                <JoinedTripCard
                destination={trip.destination}
                pickup={trip.pickup}
                riders={trip.riders}
                />
            </View> */}
      </SafeAreaView>
    );
  };
  
  export default PassengersScreen;
  