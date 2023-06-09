import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, getDoc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"
import { getUserInfo } from '../firebase'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import sendSms from '../screens/sendSms'

const TOTAL_SEATS = 4

const TripCard = (props) => {
    const date = new Date(parseFloat(props.time) * 1000); // multiply by 1000 to convert seconds to milliseconds
    const month = date.getMonth() + 1; // add 1 to convert zero-based index to one-based index
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const id = props.id;
    const riderRefs = props.riderRefs;

    const [show, setShow] = useState(true);
    const [userInfo, setUserInfo] = useState([]);
    const navigation = useNavigation();
    const handlePress = () => {
        setShow(!show)
    }

    const smsBody = 'Another student has joined your Hitch group!\n\nYou can contact them with their number: xxxxxxxxxx\n\nHave a safe ride!';
    const numberslist = ['+17143254177','+14692376435'];
    len = numberslist.length;
    const handleSendSms = () => {
    while (len != 0) {
        sendSms(numberslist[len-1], smsBody);
        len -= 1;
    }
  }

    const handleJoinGroup = () => {
        storeData();
        navigation.navigate("Home")
        
    }

    const storeData = async () => {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log("printed: ", docSnap.data());
        if (docSnap.exists()) {
            const user = docSnap.data();
            const newTrips = user.trips;
            
            newTrips.push(props.id);
            await updateDoc(docRef, {
                trips: newTrips
            });
        }

        const tripRef = doc(db, "Trips", props.id);
        const tripSnap = await getDoc(tripRef);
        if (tripSnap.exists()) {
            const trip = tripSnap.data();
            const newRiders = trip.users;
            const curNum = trip.numOfUsers;
            newRiders.push(auth.currentUser.uid);
            await updateDoc(tripRef, {
                users: newRiders,
                numOfUsers: curNum + 1,
            });
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo(riderRefs);
            setUserInfo(userInfo);
        }
        fetchUserInfo();
    }, [riderRefs]);

  return (
    <View className="border-2 mb-2 px-4 py-2 rounded-2xl w-full">
      <TouchableOpacity onPress={() => handlePress()}>
        <View className="flex-row flex justify-between">
          <Text className="text-lg text-left font-normal">
            {props.time} @ {props.destination}
          </Text>
          <Text className="text-lg text-right font-normal">
            {TOTAL_SEATS - userInfo.length} Seat Left
          </Text>
        </View>
        <View className="flex-row justify-evenly mx-4 my-4 no-wrap">
          {userInfo.length > 0 &&
            userInfo.map((user) => {
              return <Text key={user.id}>{user.userName} </Text>;
            })}
        </View>
      </TouchableOpacity>
      <View className="flex justify-center items-center mt-2">
        <TouchableOpacity
          className="w-1/3 bg-black py-2 rounded"
          onPress={() => {
            handleJoinGroup();
          }}
        >
          <Text className="text-white font-bold text-center">Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TripCard