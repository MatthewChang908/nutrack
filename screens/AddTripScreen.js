import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTripScreen = () => {
    const navigation = useNavigation()
    const [airport, setAirport] = useState("O'Hare")
    const [preferredPickup, setPreferredPickup] = useState("")

    
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
  
    const onChangeTime = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowTime(false);
      setTime(currentDate);
    };
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setDate(currentDate);
      };
  
  
    const handleShowDate = () => {
        setShowDate(!showDate);
    };
  
    const handleShowTime = () => {
        setShowTime(!showTime);
    };

  return (
    <SafeAreaView>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
        <Text>Date of Trip</Text>
        <TouchableOpacity className='bg-gray-200'
        onPress={handleShowDate}>
            <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDate && (
                <DateTimePicker
                testID="timePicker"
                value={date}
                mode='date'
                onChange={onChangeDate}
            />
        )}
        <Text>Time of Trip</Text>
        <TouchableOpacity className='bg-gray-200' 
        onPress={handleShowTime}>
            <Text>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        
        {showTime && (
                <DateTimePicker
                testID="datePicker"
                value={time}
                mode='time'
                is24Hour={true}
                onChange={onChangeTime}
                />
        )}

        <Text>Airport</Text>
        <TextInput className='bg-gray-200'
            onChangeText={(airport) => setAirport(airport)}
            value={airport}
        />

        <Text>Preferred Pickup Location</Text>
        <TextInput className='bg-gray-200'
            onChangeText={(preferredPickup) => setPreferredPickup(preferredPickup)}
            value={preferredPickup}
        />
        <TouchableOpacity>
            <Text>Submit</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AddTripScreen