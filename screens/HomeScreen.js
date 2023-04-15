import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {
    const navigation = useNavigation()
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
            navigation.replace("Welcome")
            })
            .catch(error => alert(error.message))
        }

  return (
    <SafeAreaView>
        <Text>Hi, {auth.currentUser.displayName}</Text>
        <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
        </TouchableOpacity>

        <Text>You have no planned trips</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddTrip")}>
            <Text>Add Trip</Text>
        </TouchableOpacity>
    

    </SafeAreaView>
  )
}

export default HomeScreen