import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, FlatList, ActivityIndicator, TextInput } from 'react-native';
import icon from '../../assets/icon.png'
import {useNavigation} from '@react-navigation/native'
import firebase from '../../services/firebaseConfig'
import Ask from '../../components/Ask'
import LisReplies from '../../components/ListReplies'

export default function Replies() {
    const [user, setUser] = useState('')
    const [key, setKey] = useState('')
    const [replies, setReplies] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const noLogin = ''

    async function componentDidMount(){
        await AsyncStorage.getItem('key').then( value => {
                setKey(value)
        })

        await AsyncStorage.getItem('user').then( value => {
            setUser(value)
        })
      
    }

    componentDidMount()

    useEffect(()=>{
        async function dados(){
            await firebase.database().ref(`questions/${key}`).on('value', snapshot => {
                setTitle(snapshot.val().title)
                setAuthor(snapshot.val().author)
                setDescription(snapshot.val().description)

            })

            await firebase.database().ref(`questions/${key}/replies`).on('value', snapshot => {
                setReplies([])
    
                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        author: childItem.val().author,
                        content: childItem.val().content,
                    }
    
                    setReplies(oldArray => [...oldArray, data].reverse())  
                })
    
                setLoading(false)
    
            })
            
        }

        
        
        dados()

    },[])


    async function newReplie(){
        if(user !== '' && content !== ''){
           let questions = await firebase.database().ref(`questions/${key}/replies`)
           let keyReplie = questions.push().key

           questions.child(keyReplie).set({
               author: user,
               content: content,
            })
            setContent('')
        }
    }
    
    
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
                    <Text style={styles.titlePage}>RESPONDA</Text>
                </View>

                
            </View>

            <View style={styles.questionsContainer}>
                <Ask 
                    title={title}
                    author={author}
                    description={description}
                />

                <Text style={[styles.titlePage, {fontSize: 18, textAlign: 'center', alignSelf: 'center', marginBottom: 3}]}>Respostas</Text>

                {loading ? (
                    <ActivityIndicator style={styles.loading} color='#384F7Ddd' size={80} />
                ): (
                    <FlatList 
                        keyExtractor={item => item.key}
                        data={replies}
                        renderItem={ ({item}) => (<LisReplies data={item} />)}
                    />
                )}
                
            </View>
            
            <TextInput 
                style={styles.input}
                placeholder='Digite sua resposta'
                multiline={true}
                onChangeText={texto => setContent(texto)}
            />
            <TouchableOpacity
                onPress={newReplie}
                style={styles.btn}
                
            > 
                <Text style={styles.btnText}>RESPONDER</Text>  
            </TouchableOpacity> 

            
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
        width: '90%',
        height: 40,
        backgroundColor: '#0F9AF0',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
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
        
    },
    input:{
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        height: 45,
        fontSize: 17,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
});