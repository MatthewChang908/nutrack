import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth} from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email,password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Logged in with: ", user.email);
        })
        .catch(error => alert(error.message))
    }
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Text className="ml-4 font-medium text-large pt-2">Back</Text>
        </TouchableOpacity>
        <Text className='text-4xl font-medium mt-12 ml-8'>Login</Text>
        <View className='flex-1 items-center'>
        
        <View className='bg-white items-center w-10/12 mt-4'>
            
            <TextInput className='h-12 w-full bg-white border-2 pl-2 border-black'
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                value={email}
                autoCapitalize='none'
            />
            <TextInput className='bg-white border-2 border-black w-full mt-4 pl-2 h-12'
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
                value={password}
                secureTextEntry
                autoCapitalize='none'
            />
            <TouchableOpacity onPress={handleLogin} className="bg-black w-full h-12 mt-4 rounded-md">
                <Text className="text-white font-bold text-center mt-4">LOG IN</Text>
            </TouchableOpacity>
        </View>
        </View>

            
    </SafeAreaView>

  )
}

export default LoginScreen