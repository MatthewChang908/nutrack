import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/core'

const CreatedNewTripModalScreen = () => {
    const navigation = useNavigation()

    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center border-2 mx-4 my-80">
          <View>
            <Text className="text-xl font-normal text-center font-normal">
              Thank you for creating a trip!{"\n\n"}
              We'll notify you if someone joins your trip.
            </Text>
          </View>
          <View className="flex justify-center items-center mt-6 w-full">
            <TouchableOpacity
              className="w-2/3 bg-black py-2 rounded"
              onPress={() => navigation.navigate("Home")}
            >
              <Text className="text-white text-base font-normal text-center py-1">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default CreatedNewTripModalScreen;
