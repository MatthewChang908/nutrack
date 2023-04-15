import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

const HomeScreen = () => {
    const navigation = useNavigation()


  return (
    <SafeAreaView className='flex-1 justify-between'>
        <View className='flex-1 justify-center items-center'>
            <Text>Hi, {auth.currentUser.displayName}</Text>
            
            <Text>You have no planned trips</Text>
            <TouchableOpacity className='bg-blue-200 p-2 rounded-md'
            onPress={() => navigation.navigate("AddTrip")}>
                <Text>Add Trip</Text>
            </TouchableOpacity>
    
        </View>
        <View className='flex-row justify-between px-10'>
            <TouchableOpacity className='items-center'
             onPress={() => navigation.navigate("Home")}>
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

export default HomeScreen