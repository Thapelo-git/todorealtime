
import React,{useState,useEffect} from 'react'; 
import { SafeAreaView } from 'react-native';

import Menu from './menu';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from '@react-navigation/native';
import Todo from './Todo';
import codes from './codes';
import List from './List';
const Stack = createNativeStackNavigator();
export default function App() {

  
  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"To Do List"} component={Todo}/>
            <Stack.Screen name="List" component={List}/>
            <Stack.Screen name="codes" component={codes}/>
              </Stack.Navigator>  
        </NavigationContainer>
    
  );
}


