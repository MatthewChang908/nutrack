import { Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const WelcomeScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="relative h-full w-full bg-white">      
      
        <Image 
        source={require('../assets/hitch.jpeg')}
        className='w-72 h-16 ml-12 mt-48'
       />

<Image 
        source={require('../assets/car.jpeg')}
        className='w-80 h-40 ml-12 mt-48'
       />
        
      <View className="absolute inset-x-8 bottom-12">
        <TouchableOpacity 
            className='bg-white p-2 rounded-md mt-2 w-40 h-16 border-2 border-black'
            onPress={() => navigation.navigate("Login")}>
                <Text className="text-black text-center mt-2 text-lg font-bold">LOG IN</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute inset-x-56 bottom-12">
        <TouchableOpacity
          className="bg-black p-2 rounded-md mt-2 w-40 h-16"
          onPress={() => navigation.navigate("Signup")}
        >
        <Text className="text-white text-center mt-2 text-lg font-bold" >REGISTER</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default WelcomeScreen