
import React,{useState,useEffect} from 'react'; 
import { Alert, Keyboard, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView, StyleSheet, Text, View ,FlatList,LayoutAnimation} from 'react-native';
import { ListItem,Avatar ,Button,Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
const codes = ({Navigation}) => {
    //"fallbackToCacheTimeout": 0,
    return (
        <View style={{flexDirection:'row',flex:1,marginTop:110}}>
    <TextInput style={styles.textinput}
    multiline
      value={text} onChangeText={(e)=>(setText(e))}
      placeholder={'Enter your Todo...'}/>
    
    <Button style={styles.addWrapper} title={isUpdating?'Update':'Add'} onPress={addHandle}/>
      </View >
    )
}

export default codes
