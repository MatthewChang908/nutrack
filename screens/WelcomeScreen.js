import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const WelcomeScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text>WelcomeScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        >
        <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        >
        <Text>Signup</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default WelcomeScreen