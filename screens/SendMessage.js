import React, { useState } from 'react';
import { View, TextInput, Button, SafeAreaView } from 'react-native';
import sendSms from './sendSms';

const SmsScreen = () => {
  //const [toNumber, setToNumber] = useState('');
  const smsBody = 'Another student has joined your Hitch group!\n\nYou can contact them with their number: xxxxxxxxxx\n\nHave a safe ride!';
  const numberslist = ['+17143254177','+14692376435'];
  len = numberslist.length;
  const handleSendSms = () => {
    while (len != 0) {
        sendSms(numberslist[len-1], smsBody);
        len -= 1;
    }
  }
  return(handleSendSms);
};

export default SmsScreen;