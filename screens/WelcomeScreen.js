import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const WelcomeScreen = () => {
    const navigation = useNavigation()
  return (
    <View>
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

    </View>
  )
}

export default WelcomeScreen