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
    const printauth = () => {
        console.log(auth.currentUser)
    }

  return (
    <SafeAreaView>
        <Text>Hi, {auth.currentUser.displayName}</Text>
        <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={printauth}>
            <Text>Print Auth</Text>
        </TouchableOpacity>


    </SafeAreaView>
  )
}

export default HomeScreen