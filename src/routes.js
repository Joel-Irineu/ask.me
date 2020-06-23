import React, {useState} from 'react'
import {AsyncStorage} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Ask from './pages/Ask'
import Replies from './pages/Replies'


export default function Routes(){
    const [logged, setLogged] = useState(false)

    async function componentDidMount(){
        await AsyncStorage.getItem('Logged').then( value => {
            setLogged(value)
        })
    }
    componentDidMount()
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Ask" component={Ask} />
                <AppStack.Screen name="Replies" component={Replies} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}