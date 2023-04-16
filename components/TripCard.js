import { View, Text } from 'react-native'
import React from 'react'

const TripCard = (props) => {
    const date = new Date(parseFloat(props.time) * 1000); // multiply by 1000 to convert seconds to milliseconds
    const month = date.getMonth() + 1; // add 1 to convert zero-based index to one-based index
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  return (
    <View>
      <Text>Destination: {props.destination}</Text>
      <Text>Pickup Location: {props.pickup}</Text>
      <Text>{month}/{day} at {time}</Text>
    </View>
  )
}

export default TripCard