import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

const ProfileScreen = () => {
    const navigation = useNavigation()
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
            navigation.replace("Welcome")
            })
            .catch(error => alert(error.message))
        }
  return (
    
    <SafeAreaView className='flex-1 justify-between'>
        <View>
            <Text>ProfileScreen</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
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

export default ProfileScreen