import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../firebase'

const HomeScreen = () => {
  return (
    <View>
      <Text>Hi, {auth.currentUser.displayName}</Text>
    </View>
  )
}

export default HomeScreen