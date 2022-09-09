import React from 'react'

// Nativebase
import { NativeBaseProvider } from 'native-base'

// Libraries
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

//  Navigation
import AppNavigation from './navigation'

const App = () => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default App

