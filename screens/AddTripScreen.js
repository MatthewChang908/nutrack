import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTripScreen = () => {
    const navigation = useNavigation()
    const [airport, setAirport] = useState("O'Hare")
    const [preferredPickup, setPreferredPickup] = useState("")

    
    const [date, setDate] = useState(new Date(1598051730000));
    const [time, setTime] = useState(new Date(1598051730000));
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

        <TouchableOpacity onPress={handleShowDate}>
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

        <TouchableOpacity onPress={handleShowTime}>
            <Text>Set Time</Text>
            
        </TouchableOpacity>
        <Text>{time.toLocaleString}</Text>
        {showTime && (
                <DateTimePicker
                testID="datePicker"
                value={time}
                mode='time'
                is24Hour={true}
                onChange={onChangeTime}
                />
        )}

        
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