import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { LoginStyles } from '../styles/Loginstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, userData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { email, password } = JSON.parse(userData);
          setEmail(email);
          setPassword(password);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogin = async () => {
    if (userData && userData.email && userData.password && email === userData.email && password === userData.password) {
        navigation.navigate('Dashboard')
    } else if (email && password) {
      
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const { email: storedEmail, password: storedPassword } = JSON.parse(storedData);   
  
          if (email === storedEmail && password === storedPassword)   
   {
            navigation.navigate('Dashboard')
          } else {
            setErrorMessage('Invalid email or password');
          }
        } else {
          setErrorMessage('No user found. Please register.');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please fill all fields');
    }
    await AsyncStorage.removeItem('tempUserData');
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Login</Text>
      {errorMessage ? <Text style={LoginStyles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={LoginStyles.input}
        placeholderTextColor="#ecf0f1"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={LoginStyles.input}
        placeholderTextColor="#ecf0f1"
      />
      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={LoginStyles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;