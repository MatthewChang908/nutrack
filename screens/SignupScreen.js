import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth, database} from "../firebase"
import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'

const SignupScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [allFieldsFilled, setAllFieldsFilled] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setTimeout(() => {
                    navigation.replace("Home")
                  }, 1000);
            }
        })
        return unsubscribe
    }, [])
    const handleSignUp = () => {
        if (password != passwordConfirmation) {
            alert("Passwords do not match")
            return
        }
        if (!allFieldsFilled) {
            alert("Please fill out all fields")
            return
        }
        createUserWithEmailAndPassword(auth, email,password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            const userId = user.uid;
            // set the display name
            updateProfile(auth.currentUser, {
                displayName: name,
                phoneNumber: phone,
            });
            // set the phone number
            database.ref('users/' + userId).set({
                phone: phone
            });
            console.log("Signed up with: ", user.email);
        })
        .catch(error => alert(error.message))
    }

    useEffect(() => {
        if (email != "" && password != "" && passwordConfirmation != "" && name != "" && phone != "") {
            setAllFieldsFilled(true)
        } else {
            setAllFieldsFilled(false)
        }
    }, [email, password, passwordConfirmation, name, phone])

  return (
    <SafeAreaView className='flex-1 bg-white'>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Text className="ml-4 pt-2 font-medium text-l">Back</Text>
        </TouchableOpacity>
        <Text className='text-4xl font-medium mt-8 ml-8'>Register</Text>
        <View className='flex-1 items-center'>
        
        <View className='bg-white items-center w-10/12 mt-4'>
            
            <TextInput className='bg-white border-2 border-black w-full mt-4 pl-2 h-12'
                placeholder="Name"
                onChangeText={(name) => setName(name)}
                value={name}
            />
            <TextInput className='h-12 w-full bg-white border-2 pl-2 mt-4 border-black'
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
            <TextInput className='bg-white border-2 border-black w-full mt-4 pl-2 h-12'
                placeholder="Confirm Password"
                onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}
                value={passwordConfirmation}
                secureTextEntry
                autoCapitalize='none'
            />
            <TextInput className='bg-white border-2 border-black w-full mt-4 pl-2 h-12'
                placeholder="Phone"
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
                keyboardType='numeric'
            />
            
            <TouchableOpacity onPress={handleSignUp} className="bg-black w-full h-12 mt-4 rounded-md">
                <Text className="text-white font-bold text-center mt-4">REGISTER</Text>
            </TouchableOpacity>
        </View>
        </View>

            
    </SafeAreaView>

    
  )
}

export default SignupScreen