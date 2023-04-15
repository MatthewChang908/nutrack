import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'

const AddTripScreen = () => {
    const navigation = useNavigation()
    const [tripTime, setTripTime] = useState("")
    const [tripDate, setTripDate] = useState("")
    const [airport, setAirport] = useState("")
    const [preferredPickup, setPreferredPickup] = useState("")
  return (
    <SafeAreaView>
      <Text>AddTripScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Back</Text>
    </TouchableOpacity>

      <TextInput
        placeholder="tripTime"
        onChangeText={(tripTime) => setTripTime(tripTime)}
        value={tripTime}
        />
        <TextInput
        placeholder="tripDate"
        onChangeText={(tripDate) => setTripDate(tripDate)}
        value={tripDate}
        />
        <TextInput
        placeholder="airport"
        onChangeText={(airport) => setAirport(airport)}
        value={airport}
        />
        <TextInput
        placeholder="preferredPickup"
        onChangeText={(preferredPickup) => setPreferredPickup(preferredPickup)}
        value={preferredPickup}
        />

    </SafeAreaView>
  )
}

export default AddTripScreen