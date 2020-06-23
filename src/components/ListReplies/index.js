import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function ListReplies({data}){
    const navigation = useNavigation()
    const key = data.key


    return(
        <View style={styles.container}>
            <Text style={styles.author}><Text style={{fontWeight: 'bold'}}>por: </Text>{data.author}</Text>
            <Text style={styles.content}>{data.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        marginHorizontal: 20,
        padding: 7,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    content:{
        fontSize: 15,
        color: '#384F7D',
        marginTop: 0,
    },
    author:{
        fontSize: 13,
        color: '#384F7Dcc',
        marginTop: -5,
    },
    btn:{
        width: 100,
        height: 35,
        backgroundColor: '#0F9AF0',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
        marginBottom: 5,
    },
    btnText:{
        fontSize: 14,
        color: '#fff'
    },
});