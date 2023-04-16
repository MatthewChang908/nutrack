import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
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
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
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

        createUserWithEmailAndPassword(auth, email,password)
        .then(async (userCredentials) => {
            const user = userCredentials.user;
            const userId = user.uid;
            console.log(user);
            console.log(userId);
            // set the display name
            updateProfile(auth.currentUser, {
                displayName: name
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

  return (
    <SafeAreaView>
        <Text>SignupScreen</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Text>Back</Text>
        </TouchableOpacity>
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
            onPress={handleSignUp}
            >
            <Text>Signup</Text>
            </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SignupScreen