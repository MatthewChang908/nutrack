import {Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase";
import { useNavigation } from '@react-navigation/core';

const CheckLoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
               navigation.navigate('Home');
            }
        })
        return unsubscribe
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('login').then((loginData) => {
            if (loginData) {
                setEmail(JSON.parse(loginData).email);
                setPassword(JSON.parse(loginData).password);
            }
            else {
                navigation.navigate('Welcome');
            }
        });
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
                console.log("Logged in with: ", user.displayName);
            })
            .catch(error => {
                alert(error.message)
            }) 
    }

    useEffect(() => {
        if (email && password) {
        handleLogin();
        }
    }, [email, password]);

  return (
    <View className='flex-1 bg-white items-center justify-center'>
       
    </View>
  )
}

export default CheckLoginScreen