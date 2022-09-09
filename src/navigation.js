import React from 'react'
import * as Screens from './screens/*.js'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab = createBottomTabNavigator()

const Stack = createNativeStackNavigator()

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Screens.Home} />
            <Stack.Screen name="List" component={Screens.List} />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
                showIcon: true,
            }}
        >
            <Tab.Screen name="Main" component={HomeStack} />
            <Tab.Screen name="Map" component={Screens.Map} />
        </Tab.Navigator>
    )
}


export default AppNavigation
