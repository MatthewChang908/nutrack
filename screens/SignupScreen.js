import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, database, db } from "../firebase"
import { useNavigation } from '@react-navigation/core'
import { 
    doc,
    setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'

const SignupScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
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
        if (!/@u\.northwestern\.edu$|@northwestern\.edu$/.test(email)){
            alert("Please use your Northwestern email")
            return
        }
        createUserWithEmailAndPassword(auth, email,password)
        .then(async (userCredentials) => {
            const user = userCredentials.user;
            const userId = user.uid;
            console.log(user);
            console.log(userId);
            // set the display name
            updateProfile(auth.currentUser, {
                displayName: name,
                phoneNumber: phone,
            });
            // set the phone number
            console.log("Signed up with: ", user.email);
            console.log(phone);

            // put in backend folder if have time
            await setDoc(doc(db, 'Users', userId), {
                phone: phone,
                userName: name,
                email: email,
                trips: []
            }, { merge: true });
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
        <KeyboardAvoidingView behavior='padding' className='flex-1'>
            <TouchableOpacity className='m-8 mb-0'onPress={() => navigation.navigate("Welcome")}>
                <Image source={require('../assets/back.png')}/>
            </TouchableOpacity>

            <Text className='text-4xl font-medium mt-8 ml-8'>Register</Text>

            <View className='w-10/12 self-center'>
                <View className='bg-white mt-4'>
                    <View className='flex-row justify-between'>
                        <View className='w-5/12'>
                            <Text>First Name</Text>
                            <TextInput className='bg-white border-2 border-black pl-2 rounded-md h-12 my-2'
                                onChangeText={(name) => setFirstName(name)}
                                value={firstName}
                            />
                        </View>
                        <View className='w-5/12 bg-gray-10'>
                            <Text>Last Name</Text>
                            <TextInput className='bg-white border-2 border-black pl-2 rounded-md h-12 mt-2 mb-4'
                                onChangeText={(name) => setLastName(name)}
                                value={lastName}
                            />
                        </View>
                    </View>
                
                    <Text>Northwestern Email</Text> 
                    <TextInput className='h-12 w-full bg-white border-2 pl-2 border-black my-2 rounded-md mb-4'
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        autoCapitalize='none'
                    />

                    <Text>Password</Text>
                    <TextInput className='bg-white border-2 border-black w-full pl-2 h-12 my-2 rounded-md mb-4'
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry
                        autoCapitalize='none'
                    />

                    <Text>Confirm Password</Text>
                    <TextInput className='bg-white border-2 border-black w-full pl-2 h-12 my-2 rounded-md mb-4'
                        onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}
                        value={passwordConfirmation}
                        secureTextEntry
                        autoCapitalize='none'
                    />

                    <Text>Phone Number</Text>
                    <TextInput className='bg-white border-2 border-black w-full pl-2 h-12 my-2 rounded-md mb-4'
                        onChangeText={(phone) => setPhone(phone)}
                        value={phone}
                        keyboardType='numeric'
                    />
                    
                    <TouchableOpacity onPress={handleSignUp} className="bg-black w-full h-12 mt-4 rounded-md">
                        <Text className="text-white font-bold text-center mt-4">REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
            
    </SafeAreaView>

    
  )
}

export default SignupScreen