import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import icon from '../../assets/icon.png'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../services/firebaseConfig'
import ListQuestions from '../../components/ListQuestion'

export default function Login() {
    const [user, setUser] = useState('')
    const [questions, setQuestions] = useState('')
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const noLogin = ''

    async function componentDidMount(){
        await AsyncStorage.getItem('user').then( value => {
                setUser(value)
        })
    }

    componentDidMount()

    useEffect(()=>{
        async function dados(){
            await firebase.database().ref('questions').on('value', snapshot => {
                setQuestions([])

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        author: childItem.val().author,
                        title: childItem.val().title,
                        description: childItem.val().description,
                        replies: childItem.val().replies,
                    }

                    setQuestions(oldArray => [...oldArray, data].reverse())  
                })

                setLoading(false)

            })
        }
        dados()
        
    },[])
    
    
    function toLogin(){
        navigation.navigate('Login')
    }
    
    async function toAsk(){
        navigation.navigate('Ask')
        await AsyncStorage.setItem('user', user)
    }

    async function logOut(){
        await AsyncStorage.setItem('userId', noLogin)
        await firebase.auth().signOut()
        alert('Deslogado com sucesso!')
        toLogin()
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={icon} />
                    <Text style={styles.titlePage}>PERGUNTAS</Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={toAsk}
                > 
                    <Text style={styles.btnText}>NOVA PERGUNTA</Text>  
                </TouchableOpacity> 
            </View>

            <View style={styles.questionsContainer}>
                {loading ? (
                    <ActivityIndicator style={styles.loading} color='#384F7Ddd' size={80} />
                ) : (
                        <FlatList
                            keyExtractor={item => item.key}
                            data={questions}
                            renderItem={ ({item}) => ( <ListQuestions data={item} /> ) }
                        />
                )
                }
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
    questionsContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    loading:{
        justifyContent: 'center'
    },
    btn:{
        width: 100,
        height: 40,
        backgroundColor: '#0F9AF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderRadius: 5,
        
    },
    btnText:{
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 2,
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