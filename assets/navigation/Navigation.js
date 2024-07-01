import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../screens/SignIn'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Description from '../screens/Description'
import Updater from '../screens/Updater'
import UpdateDetails from '../screens/UpdateDetails'
import ActivityDetails from '../screens/ActivityDetails'
import Personal from '../screens/Personal'
import FinalActivity from '../screens/FinalActivity'

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
        <Stack.Navigator>
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
            <Stack.Screen name='Register' component={Register} options={{title:'SignUp for new Account'}}/>
            <Stack.Screen name='Home' component={Home} options={{title:'Home Screen'}}/>
            <Stack.Screen name='Description' component={Description} options={{title:'Description Page'}}/>
            <Stack.Screen name='Updater' component={Updater} options={{title:'Confirm Transfer'}}/>
            <Stack.Screen name='UpdateDetails' component={UpdateDetails} options={{title:'Changing Details'}}/>
            <Stack.Screen name='ActivityDetails' component={ActivityDetails} options={{title:'Change Details'}}/>
            <Stack.Screen name='Profile' component={Personal} options={{title:'Profile Detail', headerShown:false}}/>
            <Stack.Screen name='Final' component={FinalActivity} options={{title:'final', headerShown:false}}/>
        </Stack.Navigator>
  )
}