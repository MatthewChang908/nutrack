import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon, Cog6ToothIcon } from "react-native-heroicons/outline";
import {updateProfile} from "firebase/auth"

const ProfileScreen = () => {
    const navigation = useNavigation()
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
            navigation.replace("Welcome")
            })
            .catch(error => alert(error.message))
    }

    const editPhoneNumber = () => {
        updateProfile(auth.currentUser, {
            phoneNumber: newPhoneNumber,
        });
    }

    const [newPhoneNumber, setNewPhoneNumber] = useState(auth.currentUser.phoneNumber)
    const printAuth = () => {
        console.log(auth.currentUser)
    }


  return (
    
    <SafeAreaView className='flex-1 justify-between'>
        <View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text></Text>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            <View className='flex-row'>
                <Text>Phone: {auth.currentUser.phoneNumber}</Text>
                <TouchableOpacity onPress={editPhoneNumber}>
                    <Cog6ToothIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={printAuth}>
                    <Text>Print Auth</Text>
                </TouchableOpacity>
                
            </View>
      

        </View>

        <View className='flex-row justify-between px-10'>
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

export default ProfileScreen