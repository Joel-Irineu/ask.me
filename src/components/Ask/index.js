import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function Ask({title, description, author}){
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <Text style={styles.titleQuestion}>{title}</Text>
            <Text style={styles.authorQuestion}><Text style={{fontWeight: 'bold'}}>Por:</Text> {author}</Text>
            <Text style={styles.descriptionQuestion}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
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
    titleQuestion:{
        fontSize: 22,
        color: '#384F7D',
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'justify',
    },
    authorQuestion:{
        fontSize: 13,
        color: '#384F7Dcc',
        marginTop: 2,
    },
    descriptionQuestion:{
        fontSize: 13,
        color: '#384F7Dcc',
        marginTop: 5,
        textAlign: 'justify',
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