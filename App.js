
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
            <Stack.Screen name={"To Do List"} options = {{headerShown :false}} component={Todo}/>
            <Stack.Screen name="List" options = {{headerShown :false}} component={List}/>
            <Stack.Screen name="codes" options = {{headerShown :false}} component={codes}/>
              </Stack.Navigator>  
        </NavigationContainer>
    
  );
}


