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
    <SafeAreaView>
      <Text>LoginScreen</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Text>Back</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={handleLogin}>
            <Text>Login</Text>
        </TouchableOpacity>
            
    </SafeAreaView>
  )
}

export default LoginScreen