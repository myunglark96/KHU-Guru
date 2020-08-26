/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
//import BluetoothList from './container/bluetooth_list'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Lecture_screen from './src/container/lecture_list'
import Student_screen from './src/container/student_list'


const Stack = createStackNavigator()

function App() {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lecture_screen">
          <Stack.Screen name="Lecture_screen" component={Lecture_screen} options={{headerShown:false}}/>
          <Stack.Screen name="Student_screen" component={Student_screen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App
