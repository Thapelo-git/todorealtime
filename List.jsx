
import React,{useState,useEffect} from 'react'; 
import { Alert, Keyboard, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView, StyleSheet, Text, View ,FlatList,LayoutAnimation} from 'react-native';
import { ListItem,Avatar ,Button,Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from "./firebase"
import Todo from './Todo'
const itemRef = firebase.ref('/ToDo')
const List = ({route,navigation}) => {
  //route.params.text
  const [date,setDate] = useState( Date())
    const [text,setText]=useState(route.params.text)
    let [currentKey,setCurrenkey]=useState('')
    const [list,setList]=useState([])
    const {itemId}=route.params
    const id=itemId
    
    useEffect(() => {
        fetchData()
        
      }, [])
      const updateHandle=()=>{
        
        
          itemRef.child(route.params.key).update({text});
        fetchData()
        setText(text)
        
        
      }
    
    const fetchData=()=>{
        itemRef.on('value',snap=>{
          let item = [];
          const a_ =snap.val();
          for (let x in a_){
            item.push({text:a_[x].text,key:x})
          }
        //setText(a_.text)
           setList(item)
        })
      }
    return (
        <View style={{marginTop:110}}>
          <Text style={{fontSize:30,fontWeight:'bold'}}>
            {text}
          </Text>
          <Text>{date}</Text>
            {/* <Text>{route.params}</Text> flexDirection:'row',flex:1,*/}
    <TextInput style={styles.textinput}
    multiline
      value={text} onChangeText={(e)=>(setText(e))}
      placeholder={'Enter your Todo...'}/>
    
    <Button style={styles.addWrapper} title={'Update Todo'} onPress={updateHandle}/>
      </View >
    )
}
const styles = StyleSheet.create({
    
    textinput:{
      height:50,
      padding:9,
      width:'90%',
      margin:4,
      borderRadius:10,
      backgroundColor:'gainsboro',
      // outline:'none'
  },
  addWrapper:{
    width:20,
    height:30,
    backgroundColor:'blue',
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center'
  },
  });

export default List
