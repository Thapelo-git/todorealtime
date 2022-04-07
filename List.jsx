

import React,{useState,useEffect} from 'react'; 
import { Alert, Keyboard, TextInput,Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView,ScrollView, StyleSheet, Text, View ,FlatList,LayoutAnimation} from 'react-native';
import { ListItem,Avatar ,Button,Image, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import codes from './codes';
import {
    SwipeableFlatList,
    SwipeableQuickActions,
    SwipeableQuickActionButton,
  } from 'react-native-swipe-list';
  import firebase from "./firebase"
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import Feather from "react-native-vector-icons/Feather"
import styled from 'styled-components/native'
  
const List = ({route,navigation}) => {
   
let [isUpdating,setIsUpdate]=useState(false)
let [iscomplete,setIscomplete]=useState('Not Complete')

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const [formatD,setFormatD]=useState('')
useEffect(() => {
  fetchData()
  
}, [])
const addHandle=()=>{
  
  if(isUpdating){
    itemRef.child(currentKey).update({text});
  fetchData()
  setText('')
  setIsUpdate(false)
 
  }
  if(!isUpdating){
    if(text === '')
    {
      Alert.alert('Comfirm','enter Todo..',[
        {
          text:'ok',
        }
      ])
    }else{
      itemRef.push({text,iscomplete,formatD,categoryname,categorycolor});
      fetchData()
      setText('')
      setFormatD('')
      Keyboard.dismiss()
      navigation.navigate('To Do List')
    }

   
  }
  
}



const handleUpdate=(key,text)=>{
  
  setCurrenkey(key)
  setIsUpdate(true)
  setText(text)
  
  
}

const handleDelete=(key)=>{
itemRef.child(key).remove()
fetchData()
}
  const clearTodos =()=>{
    
fetchData()
    
    
    Alert.alert('Confirm','Clear all Todos?',[
      {text:'Yes',
     onPress:()=>itemRef.remove(),
    },
    {text:'No'},
    ]);
    
  } 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const currentDate =  date;

  //let tempDate = new Date(currentDate)
  let tempDate =currentDate
  let fDate = tempDate.getDate()+'/'+ (tempDate.getMonth()+ 1)+'/'+tempDate.getFullYear()
  
  setFormatD(fDate )
    // console.warn("A date has been picked: ", date);
    
    hideDatePicker();
   
  };

  const  markTodo=(key,text,formatD)=>{
    // const newTodos = list.map(item=>{
    //   if(item.id==todoId){
    //     return {...item,iscomplete:true}

    //   }
    //   return item
    // })
    // setList(newTodos)
    //setCurrenkey(key)
 //   setText(text)
    itemRef.child(key).update({text:text,iscomplete:true,formatD:formatD});
  fetchData()
    // itemRef.on('value',snap=>{
    //   let item = [];
    //   const a_ =snap.val();
    //   for (let x in a_){
    //     item.push({text:a_[x].text,key:x,iscomplete:true})
    //   }
    //   setList(item)
    // })
  }
 
  const displayTodos=(item,index)=>{
    return(
        // <View style={styles.listItem}>
          <View style={{ flexDirection:'row',padding:5,borderWidth:0.34,margin:10}}>
            <Text>{item.text}</Text>
            <Text style={{flex:0.70,fontWeight:'bold',backgroundColor:'blue'}}>
            {item.text}
            </Text>
            {/* <ListItem key={index}>
                <ListItem.Content>
                    <ListItem.Title>
                        {item.text}
                    </ListItem.Title>
                    
                </ListItem.Content>
                
            </ListItem> */}
        </View>
    )
}



const ButtonContainer=styled.View`
height:45;
      width:105;
      borderRadius:30;
      alignItems:center;
      justifyContent:center;
      paddingHorizontal:5;
      flexDirection:row;
     

`;
// backgroundColor:${(props)=>(props.name === "High" ? "#1adb24" :"#fff")}  
//backgroundColor:${(props)=>(props.name === "Medium" ? "#e6b120" :"#fff")}
//backgroundColor:${(props)=>(props.name === "Low" ? "#d91a1a" :"#fff")}
const Btn =[
  {id:'1',name:'High',backgroundColor:"#1adb24"},
  {id:'2',name:'Medium',backgroundColor:"#e6b120"},
  {id:'3',name:'Low',backgroundColor:"#d91a1a"},
  
]
const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
const  [categoryname,setCategoryname]=useState('')
const  [categorycolor,setCategorycolor]=useState('')
const markcategory=(key,categoryname,categorycolor)=>{
  setSelectedBtnIndex(key)
  setCategoryname(categoryname)
  setCategorycolor(categorycolor)
 }
const itemRef = firebase.ref('/ToDo')

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
        navigation.navigate('To Do List')
        
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
      <SafeAreaView style={{padding:10,width:'100%'}}>
          <Icon name='keyboard-backspace' onPress={()=>navigation.goBack()} color='grey' size={30} style={{marginTop:40}}/>
          <View style={{alignItems:'center',justifyContent:'center',}}>
     <Text style={{fontWeight:'bold',fontSize:20,color:'grey',}}>Update Task</Text>
     </View>
    
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        value={formatD}
       //onChangeText={(e)=>(setFormatD(e))}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
       
      />
    
      
    
    {/* <Button style={styles.addWrapper}  disabled={!formatD} title={isUpdating?'Update':'Add'} onPress={addHandle}/> */}
    
      </View >
      
      <View style={{
      width:'100%',
      
      
      elevation:2,
      
      alignItems:'flex-start',
      justifyContent:'flex-start',
      }}>
        <View style={{padding:10,width:'100%'}}>
      <Text style={{color:'tomato',fontSize:20}}> Priority </Text>
      <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:10,
      justifyContent:'flex-start',width:100}}/>
      {/* <Button style={styles.addWrapper}   title={'select date'} onPress={showDatePicker}/> */}
      <Pressable style={[
            styles.button,{flexDirection:"row",alignItems:'flex-start',justifyContent:'flex-start'}
          ] }
        onPress={showDatePicker}>
          <Feather
                 name="calendar" size={22}
                 color='black'
                 />
      <Text style={{marginHorizontal:30,fontSize:17}}>
        Due Date
      </Text>
          </Pressable>
          <View style={{width:'100%',height:60,borderWidth:0.5,borderRadius:20,borderColor:'#0225A1',
        flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          {Btn.map((category,index)=>(
                <TouchableOpacity key={index} activeOpacity={0.8}
                onPress={()=> markcategory(index,category.name,category.backgroundColor)} 
                
                >
                <View style={{
                    backgroundColor:selectedBtnIndex == index
                    ?(category.backgroundColor)
                    :('gainsboro'),
                    ...styles.categoryBtn,
                }}>
               <Text style={{
                        fontSize:15,fontWeight:'bold',
                        color:selectedBtnIndex == index?'#fff' :'grey'
                    }}>{category.name}</Text>
                   
                </View>
                </TouchableOpacity>
            ))}
          </View>
          <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:10,
      justifyContent:'flex-start',width:100}}/>
      <TextInput style={styles.textinput}
    //multiline
      value={text} onChangeText={(e)=>(setText(e))}
      placeholder={'Write task here...'}/>
      <View>
      
          <Button style={[
            styles.button
          ] }   title={'Update ToDo'} onPress={updateHandle}/>
      
       
      </View>
      </View>
      </View>
      
      
       
       <ScrollView >

      
    

       
         </ScrollView>
    </SafeAreaView>
        
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
  listItem:{
    padding:10,
    backgroundColor:'white',
    // borderEndColor:'black',
    elevation:12,
    borderRadius:7,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    borderWidth:0.34
    
  },
  button : {
          
        
          
          textAlign: "center",
          textTransform: "uppercase",
          height:30,
          
  },
  header: {
    padding:20,
    marginTop:-100,
    height:'15%',
    // flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinput:{
    height:60,
    padding:10,
    width:'100%',
    margin:4,
  
    backgroundColor:'gainsboro',

    // outline:'none'
},
addWrapper:{
  width:10,
  height:30,
  backgroundColor:'blue',
  borderRadius:60,
  justifyContent:'center',
  alignItems:'center'
},
listview:{
  borderBottomColor:'grey',
  borderBottomWidth:0.5,
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-between',
},
action:{
  height:25,
  width:25,
  backgroundColor:'green',
  justifyContent:'center',
  alignItems:'center'
},
categoryBtn:{
  height:45,
  width:105,
  borderRadius:30,
  alignItems:'center',
  justifyContent:'center',
  paddingHorizontal:5,
  flexDirection:'row',

},

  });

export default List
