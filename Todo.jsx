
import React,{useState,useEffect} from 'react'; 
import { Alert, Keyboard, TextInput,Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView,ScrollView, StyleSheet, Text, View ,FlatList,LayoutAnimation} from 'react-native';
import { ListItem,Avatar ,Button,Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import codes from './codes';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
    SwipeableFlatList,
    SwipeableQuickActions,
    SwipeableQuickActionButton,
  } from 'react-native-swipe-list';
  import FontAwesome from 'react-native-vector-icons/FontAwesome'
  import firebase from "./firebase"
  import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar } from 'expo-status-bar';
import { Divider } from 'react-native-elements';
  const itemRef = firebase.ref('/ToDo')
const Todo = ({navigation}) => {
    const [text,setText]=useState('')
const [list,setList]=useState([])
  const [date,setDate] = useState( Date())
let [isUpdating,setIsUpdate]=useState(false)
const [iscomplete,setIscomplete]=useState(false)
let [currentKey,setCurrenkey]=useState('')
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const [formatD,setFormatD]=useState('')
useEffect(() => {
  fetchData()
  
}, [])

// const addHandle=()=>{
  
//   if(isUpdating){
//     itemRef.child(currentKey).update({text});
//   fetchData()
//   setText('')
//   setIsUpdate(false)
 
//   }
//   if(!isUpdating){
//     if(text === '')
//     {
//       Alert.alert('Comfirm','enter Todo..',[
//         {
//           text:'ok',
//         }
//       ])
//     }else{
//       itemRef.push({text,iscomplete,formatD});
//       fetchData()
//       setText('')
//       setFormatD('')
//       Keyboard.dismiss()
//     }

   
//   }
  
// }

const fetchData=()=>{
  itemRef.on('value',snap=>{
    let item = [];
    const a_ =snap.val();
    for (let x in a_){
      item.push({text:a_[x].text,key:x,formatD:a_[x].formatD,iscomplete:a_[x].iscomplete,
        categoryname:a_[x].categoryname,categorycolor:a_[x].categorycolor})
    }
    setList(item)
  })
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

  const  markTodo=(key,iscomplete)=>{
    // const newTodos = list.map(item=>{
    //   if(item.id==todoId){
    //     return {...item,iscomplete:true}

    //   }
    //   return item
    // })
    // setList(newTodos)
    //setCurrenkey(key)
 //   setText(text)
    itemRef.child(key).update({iscomplete:iscomplete});
  fetchData()
  
  }
  
 





    return (
        <SafeAreaView style={{flex:1,borderColor:'grey',padding:20,width:'100%'}}>
          <StatusBar
  backgroundColor="#0225A1"
          barStyle="light-content"/>
  <View style={{flexDirection:'row',padding:20,alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontSize:30}}>ToDo List</Text>
      <TouchableOpacity onPress={()=>clearTodos()}>
        <Icon name='delete' size={30} color='red'/>
      </TouchableOpacity>
  </View>
  <View style={{backgroundColor:'white',elevation:4,width:'100%',height:80,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontWeight:'bold'}}>Today</Text>
      <Text>{date}</Text>
  </View>
   
    
   
    
      {/* <Button style={styles.addWrapper}  disabled={!formatD} title={isUpdating?'Update':'Add ToDo'} onPress={addHandle}/> */}
     
   
       
       <ScrollView >
         <View style={{paddingVertical:12}}>
         {
           list.length?(<View >

<SwipeableFlatList
            showsVerticalScrollIndicator={true}
            //contentContainerStyle={{padding:10,paddingBottom:100}}
            data={list}
            //  renderItem={displayTodos} style={styles.listItem}
            //style={{backgroundColor:iscomplete? 'gray':'#fff' }}
            renderItem={({item})=>(
              
              <View style={
                styles.listItem}
              >
               
                  
                  
                  {/* <Text style={{fontSize:20}}>{item.text}  </Text> 
                  textDecorationLine: item.status === true ? "line-through" : "none"*/}
                  {/* <ListItem >
                <ListItem.Content>
                    <ListItem.Title>
                        {item.text}
                    </ListItem.Title>
                    
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>  */}
      <Text style={{color:item.categorycolor}}>{item.categoryname}</Text>
      <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',marginHorizontal:13}}>
      <Icon name='fiber-manual-record' color={item.categorycolor} size={25}/>
      <Text style={{fontSize:20}}>{item.text}</Text>
    
      </View>
         
        <Divider style={{width: 160,height:5, justifyContent:'flex-start', alignItems:'flex-start', alignSelf:'flex-start'}}/>   
      <Text style={{fontSize:20,color:'grey'}}>Due {item.formatD}</Text>
        <View style={{height:5}}></View>          
                 
      <View style={{flexDirection:'row',alignItems:'stretch',justifyContent:'space-between'}}>
      {
                item.iscomplete == 'Completed'?(
                <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                  <Feather name='check-circle' color='green' size={30}/>
                <Button disabled={true} title='Completed'/>
                </View>):(
                  <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                   
                  <Button onPress={()=>markTodo(item.key,'Completed')} title='Complete'/>
                  </View>
                )
              }
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginHorizontal:110}} onPress={()=>navigation.navigate('List',item)}>
                <FontAwesome name='pencil-square-o' size={20} color='green'/>
                <Text >Update</Text> 
              </TouchableOpacity>
              </View> 
              </View>
              
          )}
             keyExtractor={(item)=>item.key}
        renderRightActions={({item}) => (
             <SwipeableQuickActions>
                        <SwipeableQuickActionButton
                     onPress={() => { 
       
                       LayoutAnimation.configureNext(
                         LayoutAnimation.Presets.easeInEaseOut,
                       );
                     }}
                  
                     
                     />
              <TouchableOpacity  onPress={()=>handleDelete(item.key)}>
           <Icon name="delete" size={100} color={'red'} />
          
           </TouchableOpacity>
                     
            </SwipeableQuickActions>
            )}
            
            // renderRightActions={({item}) => (
            //   <SwipeableQuickActions>
            //              <SwipeableQuickActionButton
            //           onPress={() => { 
        
            //             LayoutAnimation.configureNext(
            //               LayoutAnimation.Presets.easeInEaseOut,
            //             );
            //           }}
                   
                      
            //           />
            //    <TouchableOpacity onPress={()=>handleUpdate(item.key,item.text)}>
            // <Text>update</Text>
            // <Icon name="edit" size={30} color='blue' />
            // </TouchableOpacity>
                      
            //  </SwipeableQuickActions>
            //  )}
            
            />
             
            </View>
            
           ):(
             <Text style={{fontSize:25,}}>
             No Task Today 
             
             </Text>
           )
         }
      
    

            
         </View>
         </ScrollView>
         <View style={{
         alignItems:'center',justifyContent:'center',bottom:20,}}>
           <View style={{width:60,height:60,backgroundColor:'#0225A1',borderRadius:30,
          alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('codes')}>
            <Icon name='add' size={30} color='white'/>
          </TouchableOpacity>
           </View>
            {/* <Text style={{fontWeight:'bold'}}>You have {list.length} pending tasks</Text>
          <TouchableOpacity onPress={()=>clearTodos()}>
                                <Icon name="delete" size={30} color='red' />
                                </TouchableOpacity> */}
        
         </View>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    listItem:{
      padding:10,
      backgroundColor:'white',
      width:'100%',
      height:135,
      elevation:8,
      borderRadius:7,
      alignItems:'flex-start',
      justifyContent:'flex-start',
    marginVertical:10
      
    },
    button : {
            borderRadius: 20,
            width: 120,
            // backgroundColor: 'blue',
            padding: 20,
            textAlign: "center",
            textTransform: "uppercase",
            height:50,
            marginTop:60
            
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
      height:90,
      padding:20,
      width:'80%',
      margin:4,
      borderRadius:10,
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
    borderRadius:10,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center'
  }
  });

export default Todo
