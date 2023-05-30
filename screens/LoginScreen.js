import { View, Text, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth} from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            AsyncStorage.setItem('login', JSON.stringify({ email, password }))
            console.log("Logged in with: ", user.email);
        })
        .catch(error => alert(error.message))
    }
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <KeyboardAvoidingView behavior='padding' className='flex-1'>
             <TouchableOpacity className='m-8 mb-0'onPress={() => navigation.navigate("Welcome")}>
                <Image source={require('../assets/back.png')}/>
            </TouchableOpacity>
            <Text className='text-4xl font-medium mt-12 ml-8'>Login</Text>

            <View className='w-10/12 self-center'>
            
                <View className='bg-white mt-4'>
                    
                    <Text>Email</Text>
                    <TextInput className='h-12 w-full bg-white border-2 pl-2 border-black my-2 rounded-md mb-4'
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        autoCapitalize='none'
                    />

                    <Text>Password</Text>
                    <TextInput className='bg-white border-2 border-black w-full mt-4 pl-2 h-12 my-2 rounded-md mb-4'
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
        </KeyboardAvoidingView>


            
    </SafeAreaView>

  )
}

export default LoginScreen