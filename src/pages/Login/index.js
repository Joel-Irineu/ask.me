import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import logo from '../../assets/logo.png'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../services/firebaseConfig'

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    function toRegister(){
        navigation.navigate('Register')
    }

    function toHome(){
        navigation.navigate('Home')
    }

    async function componentDidUpdate(_, prevState){
        if(prevState !== email){
            await AsyncStorage.setItem('user', email)
        }
    }
    
    async function Login(){
        await firebase.auth().signInWithEmailAndPassword(email, password).then( value => {
            alert(`Bem-vindo: ${value.user.email}`)
            componentDidUpdate()
            toHome()
            setEmail('')
            setPassword('')

        }).catch( error => {
                alert('Ops, algo deu errado!\n tente logar novamente...')
                return;
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
                keyboardType='email-address'
                placeholder='E-email'
            />
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={texto => setPassword(texto)}
                value={password}
                placeholder='Senha'
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={Login}
            > 
                <Text style={styles.btnText}>Logar</Text>  
            </TouchableOpacity> 

            <TouchableOpacity 
                style={styles.register}
                onPress={toRegister}
            >
                <Text style={styles.registerText}>Cadastrar novo usuario</Text>
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
    register:{
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
    },
    registerText:{
        textAlign: 'right',
        
    }
});