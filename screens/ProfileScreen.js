import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import {
  HomeIcon,
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
  Cog6ToothIcon,
} from "react-native-heroicons/outline";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.removeItem("login");
        navigation.replace("Welcome");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    setNewPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  const getPhoneNumber = async () => {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().phone;
    }
  };

  const updatePhoneNumber = async () => {
    const docRef = doc(db, "Users", userId);
    await updateDoc(docRef, {
      phone: newPhoneNumber,
    });
    console.log("Phone number updated successfully!");
    setPhoneNumber(newPhoneNumber);
  };

  useEffect(() => {
    getPhoneNumber()
      .then((number) => {
        console.log("Phone number:", number);
        setPhoneNumber(number);
      })
      .catch((error) => {
        console.error("Error getting phone number:", error);
      });
  }, [phoneNumber]);

  return (
    <SafeAreaView className="flex-1 justify-between">
      <View>
        <View className="flex-col justify-between items-center pt-40">
          {editPhoneNumber ? (
            <View className="flex-col items-center">
              <Text className=" items-left text-xl font-medium mt-8">
                Phone:{" "}
              </Text>

              <View className="flex-row">
                <TextInput
                  className=" bg-white border-2 mt-4 border-black w-2/3 h-8"
                  placeholder="Phone"
                  onChangeText={(num) => setNewPhoneNumber(num)}
                  value={newPhoneNumber}
                  keyboardType="numeric"
                />
              </View>

              <View className="flex-col w-2/3">
                <TouchableOpacity
                  className=" bg-black h-12 mt-4 rounded-md items-center justify-center"
                  onPress={() => {
                    updatePhoneNumber();
                    setEditPhoneNumber(false);
                  }}
                >
                  <Text className="text-xl text-white font-small">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text className="text-xl font-medium mt-8 ml-8">Phone: {phoneNumber}</Text>
          )}
        </View>
      </View>

      <View className="flex-row justify-between px-10"></View>
      <View className="flex-row justify-between px-10"></View>
      <View className="flex-row justify-between px-10"></View>
      <View className="flex-row justify-between px-10"></View>
      <View className="flex-row justify-between px-10"></View>

      <View className="flex-row justify-center px-8 -mb-12">
        <TouchableOpacity
          className="flex-row bg-white w-10/12 h-12 px-8 rounded-md items-center justify-center border-black border-2 mt-48"
          onPress={() => setEditPhoneNumber(true)}
        >
          <Text className="text-black text-lg font-lg">EDIT PHONE</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center px-8 -mb-4">
        <TouchableOpacity
          className="bg-black w-10/12 h-12 mt-4 rounded-md items-center justify-center"
          onPress={handleSignOut}
        >
          <Text className="text-white text-lg font-lg">SIGN OUT</Text>
        </TouchableOpacity>
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
  );
};

export default ProfileScreen;
