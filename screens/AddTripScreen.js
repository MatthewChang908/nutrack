import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTripScreen = () => {
    const navigation = useNavigation()
    const [airport, setAirport] = useState("O'Hare")
    const [preferredPickup, setPreferredPickup] = useState("Evanston")

    
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date("2023-05-12"));
    const [dateString, setDateString] = useState("");
    const [timeString, setTimeString] = useState("");
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
  
    const onChangeTime = (event, selectedDate) => {
        setTimeString(selectedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        setShowTime(false);
        setTime(selectedDate);
    };
    const onChangeDate = (event, selectedDate) => {
        setDateString(selectedDate.toLocaleDateString());
        setShowDate(false);
        setDate(selectedDate);
    };
  
  
    const handleShowDate = () => {
        setShowDate(!showDate);
    };
  
    const handleShowTime = () => {
        setShowTime(!showTime);
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text className="ml-4 pt-2 font-medium text-l">Back</Text>
        </TouchableOpacity>
        
        <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView>
        
  
        <Text className='text-4xl font-medium mt-8 ml-8'>Enter Trip Information</Text>
        
        <View className='bg-white grid grid-cols-1 divide-y items-left w-full mt-4 pl-8 pr-8 divide-gray-400'> 

        <View>
            <Text className="font-bold text-lg mt-2">Date of Trip</Text>
            <TouchableOpacity className='bg-white border-black border-1 mt-2 -mb-1'
            onPress={handleShowDate}>
                <Text className="text-lg">{date.toLocaleDateString()} ▼</Text>
            </TouchableOpacity>
            
            {showDate && (
                    <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode='date'
                    onChange={onChangeDate}
                />
            )}

        </View>

     
        <View className="mt-4">
            <Text className="font-bold text-lg mt-2">Time of Trip</Text>
            <TouchableOpacity className='bg-white border-black mt-2 -mb-1' 
            onPress={handleShowTime}>
                <Text className="text-lg">{time.toLocaleTimeString()} ▼</Text>
            </TouchableOpacity>
            
            {showTime && (
                    <DateTimePicker
                    testID="timePicker"
                    value={time}
                    mode='time'
                    is24Hour={true}
                    onChange={onChangeTime}
                    />
            )}
        </View>

        <View className="mt-4">
            <Text className="font-bold text-lg mt-2">Airport</Text>
            <TextInput className='bg-white border-gray-200 border-2 rounded-lg text-md pl-2 h-9'
                onChangeText={(airport) => setAirport(airport)} 
                value={airport}
            />
        </View>
        <View className="mt-4 mb-4">
            <Text className="font-bold text-lg mt-2">Preferred Pickup Location</Text>
            <TextInput className='bg-white border-gray-200 border-2 rounded-lg text-md pl-2 h-9'
                onChangeText={(preferredPickup) => setPreferredPickup(preferredPickup)}
                value={preferredPickup}
            />
        </View>

        </View>
            </ScrollView>
            <View className="grid grid-cols-1 divide-y divide-gray-400 pl-8 pr-8">
            <View></View>
            <View className="flex-1 bg-white w-full mt-4 pl-8 pr-8 divide-gray-400 mb-2">
                <TouchableOpacity onPress={() => {
                    navigation.navigate("DiscoverScreen", { 
                        time: timeString,
                        destination: airport,
                        pickup: preferredPickup,
                    })}
                }
                className="bg-black w-full h-12 mt-4 rounded-md">
                    <Text className="text-white font-bold text-center mt-4">FIND TRIP</Text>
                </TouchableOpacity>
            </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddTripScreen