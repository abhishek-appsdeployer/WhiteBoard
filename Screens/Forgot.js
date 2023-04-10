import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const handleForgotPassword = async () => {
    if (email != '') {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert(
          'Password Reset Email Sent',
          'Please check your email for instructions on how to reset your password.',
        );
        navigation.navigate('login');
      } catch (error) {
        Alert.alert('Error', error.message);
        setEmailErr('Email not registered');
      }
    } else {
      setEmailErr('Email cannot be empty');
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
        elevation: 4,
      }}
      colors={['#151617', '#1c2436', '#151617']}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 45,
            fontWeight: '900',
            color: '#ffffff',
            marginTop: 50,
            textAlign: 'center',
          }}>
          WhiteBoard
        </Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          keyboardAppearance="dark"
          keyboardType="email-address"
          // maxLength={20}
          style={{
            borderWidth: 1,
            height: 50,
            borderRadius: 5,
            borderColor: 'white',
            backgroundColor: 'white',
            elevation: 3,
            marginTop: 15,
            marginBottom: 15,
            fontSize: 20,
            color: 'black',
          }}
          placeholder="Email"
        />
        {emailErr && <Text style={{color: 'yellow'}}>{emailErr}</Text>}

        <TouchableOpacity
          android_ripple={{color: 'white'}}
          onPress={handleForgotPassword}
          style={{
            overflow: 'hidden',
            borderWidth: 1,
            height: 50,
            borderRadius: 5,
            borderColor: '#1c2436',
            backgroundColor: '#1c4dc0',
            elevation: 3,
            marginTop: 15,
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Forgot;
