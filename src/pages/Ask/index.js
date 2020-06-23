import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import icon from '../../assets/icon.png'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../services/firebaseConfig'

export default function Ask() {
    const [user, setUser] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigation = useNavigation()
    const noLogin = ''

    async function componentDidMount(){
        await AsyncStorage.getItem('user').then( value => {
                setUser(value)
        })
    }

    componentDidMount()
    

    function toLogin(){
        navigation.navigate('Login')
    }

    function toHome(){
        navigation.navigate('Home')
    }
    async function logOut(){
        await AsyncStorage.setItem('userId', noLogin)
        await AsyncStorage.setItem('user', noLogin)
        await firebase.auth().signOut()
        alert('Deslogado com sucesso!')
        toLogin()
    }

    async function newAsk(){
        if(title !== '' && description !== ''){
           let questions = await firebase.database().ref('questions')
           let key = questions.push().key

           questions.child(key).set({
               title: title,
               author: user,
               description: description,
               user: user
           })

           alert('pergunta feita com sucesso!')
           setTitle('')
           setDescription('')
           toHome()
        }
    }



    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={icon} />
                <Text style={styles.titlePage}>PERGUNTE</Text>
            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={newAsk}
            > 
                <Text style={styles.btnText}>PERGUNTAR</Text>  
            </TouchableOpacity> 
        </View>
        <View>
            <TextInput 
                style={styles.input}
                placeholder='Titulo da pergunta'
                onChangeText={texto => setTitle(texto)}
            />
            <TextInput 
                style={[styles.input, styles.inputDescription]}
                maxLength={225}
                multiline={true}
                onChangeText={texto => setDescription(texto)}
                placeholder={`Detalhes da pergunta\n(max. 225 caracteres)`}
            />

            
        </View> 
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    header:{
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 5,
        paddingTop: 27,
        backgroundColor: '#fff'
    },
    titlePage:{
        margin: 10,
        fontSize: 25,
        margin: 0,
        fontWeight: 'bold',
        color: '#384F7Ddd'
    },
    text:{
        margin: 10,
        fontSize: 20,
    },
    textUser:{
        fontWeight: 'bold',
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
        alignSelf: 'center',
    },
    inputDescription:{
        height: 200,
        alignContent: 'flex-start',
    },
    btn:{
        width: 100,
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