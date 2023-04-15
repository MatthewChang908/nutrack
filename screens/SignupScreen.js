import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {auth, database} from "../firebase"
import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'

const SignupScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setTimeout(() => {
                    navigation.replace("Home", {user})
                  }, 1000);
            }
        })
        return unsubscribe
    }, [])

    const handleSignup = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid;
                database.ref('users/' + userId).set({
                    name: name,
                    email: email.toLowerCase(),
                    phone: phone,
                });
                updateProfile(auth.currentUser, {
                    displayName: name 
                });
                console.log("Signed up with: ", user.email);

        })
        .catch((error) => alert(error.message))
    }

  return (
    <View>
        <Text>SignupScreen</Text>
        <TextInput
            placeholder="name"
            onChangeText={(name) => setName(name)}
            value={name}
            />
        <TextInput
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
            value={email}
            />
        <TextInput
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            />
        <TextInput
            placeholder="phone"
            onChangeText={(phone) => setPhone(phone)}
            value={phone}
            />
        <TouchableOpacity
            onPress={handleSignup}
            >
            <Text>Signup</Text>
            </TouchableOpacity>

    </View>
  )
}

export default SignupScreen