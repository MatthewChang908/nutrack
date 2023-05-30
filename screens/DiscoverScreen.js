import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import { Timestamp } from "firebase/firestore"
import { auth, getMatchingTrips, addNewTrip } from '../firebase'
import TripCard from '../components/TripCard';

const DiscoverScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(true);

    // Get the params from the Add Trip Scren
    const { time, flexibility, date, destination, pickup } = route.params;
    const navigation = useNavigation();
    const userId = auth.currentUser.uid;
    const [trips, setTrips] = useState([]);

    const [month, day, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const period = minute.slice(-2);
    const isPM = (period === 'PM');
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
    const convertedDateObject = dateObject.getTime()
    const timestamp = Timestamp.fromDate(dateObject);

    // Create lower bound and upper bound based on flexibility
    const lbTimeStamp = Timestamp.fromDate(new Date(convertedDateObject - flexibility * 60 * 1000));
    const ubTimeStamp = Timestamp.fromDate(new Date(convertedDateObject + flexibility * 60 * 1000));

    const handleCreateNewTrip = async (userId, timeStamp, flexibility, destination, pickup) => {
      navigation.navigate("CreatedNewTrip");
      setIsLoading(true);
      await addNewTrip(userId, timeStamp, flexibility, destination, pickup);
    }

    const toDisplayTime = (timeStamp) => {
      const dateObject = timeStamp.toDate();
      const time = dateObject.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return time;
    }

    const toDisplayDate = (timeStamp) => {
      const dateObject = timeStamp.toDate();
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric"
      };
      return dateObject.toLocaleDateString("en-US", options);
    }
 
  useEffect(() => {
    const unsubscribe = getMatchingTrips(
      lbTimeStamp,
      ubTimeStamp,
      destination,
      pickup,
      async (snapshot) => {
        const newTrips = [];
        await snapshot.docs.map((doc) =>
          newTrips.push({ id: doc.id, ...doc.data() })
        );

        setTrips(newTrips);
        setIsLoading(false);
      },
      (error) => { 
        console.error(error);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [destination, pickup, setTrips]);

    return (
      <SafeAreaView className="flex-1 justify-between">
        {!isLoading && trips && (
          <>
            {trips.length > 0 ? (
              <>
                  <View className="flex-1">
                    <View>
                      <Text className="text-2xl font-normal text-center mt-4">
                        {pickup} to {destination}
                      </Text>
                      <Text className="text-xs font-normal text-center">
                        {toDisplayTime(lbTimeStamp)}-{toDisplayTime(ubTimeStamp)} {toDisplayDate(timestamp)}
                      </Text>
                    </View>
                    <ScrollView className="w-full mt-6 h-5/6">
                      {trips.map((trip) => {
                        return (
                          <View
                            className="items-center mx-6 mt-4"
                            key={trip.id}
                          >
                            <TripCard
                              destination={trip.destination}
                              pickup={trip.pickup}
                              riderRefs={trip.riderRefs}
                              time={toDisplayTime(trip.time)}
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
              </>
            ) : (
              <View>
                <View className="flex mt-64 items-center justify-center">
                  <Text className="text-black text-xl mx-4 text-center font-normal">
                    There are no current trips that match your needs.
                  </Text>
                </View>
                <View className="mt-4">
                  <TouchableOpacity
                    onPress={() =>
                      handleCreateNewTrip(
                        userId,
                        timestamp,
                        flexibility,
                        destination,
                        pickup
                      )
                    }
                    className="bg-black w-10/12 self-center h-12 mt-4 rounded-md justify-center"
                  >
                    <Text className="text-white text-center font-normal text-lg">
                      Create New Trip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AddTrip")}
                    className="bg-black w-10/12 self-center h-12 mt-4 rounded-md justify-center"
                  >
                    <Text className="text-white text-center font-normal text-lg">
                      View All Trips
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    );
}

export default DiscoverScreen