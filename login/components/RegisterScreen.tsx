import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import   
 { RegisterStyles } from '../styles/Registerstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const   
 handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (email && password) {
      setErrorMessage('');

      // Temporarily store data in AsyncStorage
      try {
        await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
        alert('Registration Successful! You can now log in.');
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error storing data:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please fill all fields');
    }
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Register</Text>
      {errorMessage ? <Text style={RegisterStyles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={RegisterStyles.input}
        placeholderTextColor="#ecf0f1
" 
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={RegisterStyles.input}
        placeholderTextColor="#ecf0f1
" 
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={RegisterStyles.input}
        placeholderTextColor="#ecf0f1
" 
      />
      <TouchableOpacity style={RegisterStyles.button} onPress={handleRegister}>
        <Text style={RegisterStyles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={RegisterStyles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;