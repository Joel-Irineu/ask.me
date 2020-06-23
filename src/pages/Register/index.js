import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/logo.png'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../services/firebaseConfig'

console.disableYellowBox = true

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  function toLogin(){
    navigation.navigate('Login')
  }

  async function register(){
    await firebase.auth().createUserWithEmailAndPassword(email, password).then( value => {
        alert(`usuario ${name} criado com sucesso!`)

        setName('')
        setEmail('')
        setPassword('')
        toLogin()
    }).catch( error => {
        alert('algo deu errado')
    })
  }


    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
            />

            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={texto => setEmail(texto)}
                value={email}
                placeholder='seu melhor email'
            />

            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={texto => setPassword(texto)}
                value={password}
                placeholder='minimo de 6 caracteres'
                secureTextEntry={true}
            />

        <TouchableOpacity
            style={styles.btn}
            onPress={register}
        > 
            <Text style={styles.btnText}>Registrar novo usuario</Text>  
        </TouchableOpacity> 

        <TouchableOpacity 
            style={styles.login}
            onPress={toLogin}
        >
            <Text style={styles.loginText}>Já possui uma conta? clique aqui</Text>
        </TouchableOpacity> 
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    logo:{
        marginBottom: 10,
    },
    input:{
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        height: 45,
        fontSize: 17,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    btn:{
        width: '90%',
        height: 45,
        backgroundColor: '#0F9AF0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnText:{
        fontSize: 15,
        color: '#fff'
    },
    login:{
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
    },
    loginText:{
        textAlign: 'right',
        
    }
});