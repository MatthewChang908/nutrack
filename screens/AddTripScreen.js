import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/outline';


const AddTripScreen = () => {
    const navigation = useNavigation()

    const [dateString, setDateString] = useState("");
    const [timeString, setTimeString] = useState("");
    const [showPickup, setShowPickup] = useState(false);
    const [pickupLocation, setPickupLocation] = useState("None");

    handleShowPickup = () => {
        if (showAirport) {
            setShowAirport(false);
        }
        setShowPickup(!showPickup);   
    }

    handleSetPickup = (location) => {
        setPickupLocation(location);
        setShowPickup(false);
    }

    const pickupLocations = [
        "Sargent",
        "Tech",
        "Willard",
        "Elder",
        "Foster-Walker",
        "Allison",
        "Shepard",
        "Lincoln"
    ]

    const airports = [
        "O'Hare",
        "Midway"
    ]

    const [showAirport, setShowAirport] = useState(false);
    const [airport, setAirport] = useState("None");

    handleShowAirport = () => {
        if (showPickup) {
            setShowPickup(false);
        }
        setShowAirport(!showAirport);

    }

    handleSetAirport = (location) => {
        setAirport(location);
        setShowAirport(false);
    }

    const validateTimeFormat = (input) => {
        const pattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    
        return pattern.test(input);
      };
    
    const validateDateFormat = (input) => {
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;
    return pattern.test(input);
    };

    const validateAll = () => {
        if (!validateDateFormat(dateString)) {
            alert("Please enter a valid date in the format mm/dd/yyyy");
            return false;
        }
        if (!validateTimeFormat(timeString)) {
            alert("Please enter a valid time in the format hh:mm AM/PM");
            return false;
        }
        if (pickupLocation === "None") {
            alert("Please select a pickup location");
            return false;
        }
        if (airport === "None") {
            alert("Please select an airport");
            return false;
        }
        return true;
    }

    const handleNavDiscover = () => {
        if (validateAll()) {
            navigation.navigate("DiscoverScreen", {
                time: timeString,
                flexibility: flexibility,
                date: dateString,
                pickup: pickupLocation,
                destination: airport
            });
        }
    }

    
    const [flexibility, setFlexibility] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-white z-0">
        <KeyboardAvoidingView behavior="padding">    

            <TouchableOpacity className='m-8 mb-0'onPress={() => navigation.navigate("Home")}>
                    <Image source={require('../assets/back.png')}/>
            </TouchableOpacity>
            
                
    
            <Text className='text-4xl font-medium mt-8 ml-8'>Find Trip</Text>
            
            <View className='w-10/12 self-center'>
                <View className='flex-row justify-between pt-3 z-20'>
                    <View className='w-5/12'>
                        <Text>Trip Date</Text>
                        <TextInput className='border rounded-md h-12 w-full p-2'
                            placeholder='mm/dd/yyyy'
                            onChangeText={(date) => setDateString(date)}
                            value={dateString}
                        />
                    </View>

                    <View className='w-5/12'>
                        <Text>Airport</Text>
                        <TouchableOpacity className='border rounded-md h-12 items-center justify-between p-2 flex-row'
                            onPress={() => handleShowAirport()}>
                                <Text>{airport}</Text>
                                {showAirport ? (
                                    <ChevronDownIcon color={"#000000"} size={20}/>
                                ) : (
                                    <ChevronLeftIcon color={"#000000"} size={20}/>
                                )}
                        </TouchableOpacity>
                        <View className='items-center'>
                            {showAirport ? (
                                <View className='absolute w-10/12'>
                                    {airports.map((loc, index) => (
                                        <TouchableOpacity key={index} className='border h-12 items-start justify-center p-2 bg-white'
                                        onPress={() => handleSetAirport(loc)}>
                                            <Text>{loc}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
               

                <View className='pt-3 z-10'>
                    <Text>Pickup Location</Text>
                    <TouchableOpacity className='border rounded-md h-12 w-full items-center justify-between p-2 flex-row'
                        onPress={() => handleShowPickup()}>
                            <Text>{pickupLocation}</Text>
                            {showPickup ? (
                                <ChevronDownIcon color={"#000000"} size={20}/>
                            ) : (
                                <ChevronLeftIcon color={"#000000"} size={20}/>
                            )}
                    </TouchableOpacity>
                    <View className='items-center'>
                        {showPickup ? (
                            <View className='absolute w-10/12'>
                                {pickupLocations.map((location, index) => (
                                    <TouchableOpacity key={index} className='border h-12 items-start justify-center p-2 bg-white'
                                    onPress={() => handleSetPickup(location)}>
                                        <Text>{location}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : null}
                    </View>
                </View>
         
             
                <View className='flex-row justify-between pt-3'>
                    <View className='w-5/12'>
                        <Text>Pickup Time</Text>
                        <TextInput className='border rounded-md h-12 w-full p-2' 
                            placeholder='00:00 AM'
                            onChangeText={(time) => setTimeString(time)}
                            value={timeString}
                        />
                    </View>
                
                    <View className='w-5/12'>
                        <Text>Flexibility</Text>
                        <View className='border rounded-md flex-row h-12 items-center justify-between p-2'>    
                            <View className='flex-row'>
                                <Image source={require('../assets/plusminus.png')} 
                                    className='w-5 h-5'/>
                                <TextInput className='w-1/2'
                                    placeholder='0'
                                    onChangeText={(flexibility) => setFlexibility(flexibility)}
                                    value={flexibility}
                                    keyboardType='numeric'
                                />
                            </View>
                            <Text>mins</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleNavDiscover()} className="bg-black w-full self-center h-12 mt-4 rounded-md justify-center z-0">
                        <Text className='text-white text-center text-lg'>Find Trip</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddTripScreen