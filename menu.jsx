import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from '@react-navigation/native';
import Todo from './Todo';
import Codes from './codes'
const Stack = createNativeStackNavigator();
const Menu = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"To Do List"} component={Todo}/>
            <Stack.Screen name={"Update"} component={Codes}/>
              </Stack.Navigator>  
        </NavigationContainer>
    )
}

export default Menu
