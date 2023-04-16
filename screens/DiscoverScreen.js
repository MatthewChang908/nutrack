import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";

const DiscoverScreen = () => {
    const navigation = useNavigation()
  
  
    return (

    <SafeAreaView className= 'flex-1 justify-between'>
        <View>
            <Text>DiscoverScreen</Text>
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