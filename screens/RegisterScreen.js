import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('Home'))
      .catch(error => Alert.alert('Registration Error', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} value={password} />
      <TouchableOpacity onPress={handleRegister} style={styles.btn}><Text style={styles.btnText}>Register</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text>Already have an account? Login</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20 },
  input: { width: '100%', padding: 12, marginBottom: 15, borderWidth: 1, borderRadius: 10 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { color: 'white' }
});
