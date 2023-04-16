import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { HomeIcon, UserCircleIcon, MagnifyingGlassCircleIcon, Cog6ToothIcon } from "react-native-heroicons/outline";
import {updateProfile} from "firebase/auth"
import {doc, getDoc, updateDoc} from "firebase/firestore"
const ProfileScreen = () => {
    const navigation = useNavigation()
    const userId = auth.currentUser.uid;
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber)
    const [editPhoneNumber, setEditPhoneNumber] = useState(false)
    
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
            navigation.replace("Welcome")
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        setNewPhoneNumber(phoneNumber)
    }, [phoneNumber])

    const getPhoneNumber = async () => {
        const docRef = doc(db, "Users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().phone;
        }
    }

    const updatePhoneNumber = async () => {
        const docRef = doc(db, "Users", userId);
        await updateDoc(docRef, {
          phone: newPhoneNumber
        });
        console.log('Phone number updated successfully!');
        setPhoneNumber(newPhoneNumber)
      }

    useEffect(() => {
        getPhoneNumber().then((number) => {
          console.log('Phone number:', number);
            setPhoneNumber(number)
        }).catch((error) => {
          console.error('Error getting phone number:', error);
        });
      }, [phoneNumber]);

  return (
    
    <SafeAreaView className='flex-1 justify-between'>
        <View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text></Text>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            <View className='flex-row'>
                {editPhoneNumber ?
                    <View>
                        <Text>Phone: </Text>
                        <TextInput
                        className='bg-blue-200 w-24'
                        value={newPhoneNumber}
                        onChangeText={(num) => setNewPhoneNumber(num)}
                        />
                        <TouchableOpacity onPress={() => {
                            updatePhoneNumber()
                            setEditPhoneNumber(false)}}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text>Phone: {phoneNumber}</Text>
                }
                <TouchableOpacity onPress={() => setEditPhoneNumber(true)}>
                    <Cog6ToothIcon />
                </TouchableOpacity>

            </View>
      

        </View>

        <View className='flex-row justify-between px-10'>
            <TouchableOpacity className='items-center'
             onPress={() => navigation.navigate("DiscoverScreen")}>
                <MagnifyingGlassCircleIcon />
                <Text>Find Group</Text>
            </TouchableOpacity>

            <TouchableOpacity className='items-center'
            onPress={() => navigation.navigate("Home")}>
                <HomeIcon />
                <Text>Home</Text>
            </TouchableOpacity>


            <TouchableOpacity className='items-center'
            onPress={() => navigation.navigate("Profile")}>
                <UserCircleIcon />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen