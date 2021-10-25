
import React,{useState,useEffect} from 'react'; 
import { Alert, Keyboard, TextInput,Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView,ScrollView, StyleSheet, Text, View ,FlatList,LayoutAnimation} from 'react-native';
import { ListItem,Avatar ,Button,Image} from 'react-native-elements';
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
  // import { ScrollView } from 'react-native-gesture-handler';
  const itemRef = firebase.ref('/ToDo')
const Todo = ({navigation}) => {
    const [text,setText]=useState('')
const [list,setList]=useState([])
  const [date,setDate] = useState( Date())
let [isUpdating,setIsUpdate]=useState(false)
let [iscomplete,setIscomplete]=useState(false)
let [currentKey,setCurrenkey]=useState('')
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
      itemRef.push({text,iscomplete,formatD});
      fetchData()
      setText('')
      setFormatD('')
      Keyboard.dismiss()
    }

   
  }
  
}

const fetchData=()=>{
  itemRef.on('value',snap=>{
    let item = [];
    const a_ =snap.val();
    for (let x in a_){
      item.push({text:a_[x].text,key:x,formatD:a_[x].formatD,iscomplete:a_[x]})
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
  // let temp = new Date()

  // let fDate = temp.format('l')
  // setDate(fDate )
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





    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff',alignItems: 'center',
        justifyContent: 'space-between',borderColor:'grey',padding:10}}>
     <Text style={{fontWeight:'bold',fontSize:40,color:'grey'}}>Add Todos</Text>
    
    {/* <View style={styles.header}>
      <Text style={{fontWeight:'bold',fontSize:40,color:'blue'}}>Todo App</Text>
      <Avatar
      source={{uri:'https://images.pexels.com/photos/5717451/pexels-photo-5717451.jpeg?cs=srgb&dl=pexels-polina-kovaleva-5717451.jpg&fm=jpg'}}
      style={{width:300,height:100}}/>
    </View> */}
    <View style={{flexDirection:'row',flex:1,marginTop:20}}>
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
      
      // borderEndColor:'black',
      marginTop:-40,
      elevation:12,
      borderRadius:7,
      alignItems:'flex-start',
      justifyContent:'flex-start',
      borderWidth:0.34}}>
        <View style={{padding:30,width:'100%'}}>
      <Text style={{color:'tomato'}}> select todo Date </Text>
      {/* <Button style={styles.addWrapper}   title={'select date'} onPress={showDatePicker}/> */}
      <Pressable style={[
            styles.button,{backgroundColor: 'blue',flexDirection:"row"}
          ] }
        onPress={showDatePicker}>
          <Feather
                 name="calendar" size={22}
                 color='black'
                 />
      <Text>
        Select date
      </Text>
          </Pressable>
     
      <TextInput style={styles.textinput}
    multiline
      value={text} onChangeText={(e)=>(setText(e))}
      placeholder={'Enter your Todo...'}/>
      <View>
       {
        !formatD?(
      
           <Button style={[
            styles.button
          ] }  disabled={true} title={isUpdating?'Update':'Add ToDo'} onPress={addHandle}/>
        ):(
          <Button style={[
            styles.button
          ] }  disabled={false} title={isUpdating?'Update':'Add ToDo'} onPress={addHandle}/>
      
          // <Button style={styles.addWrapper}  disabled={false} title={'Add ToDo'} onPress={addHandle}/>
        )
      }
      </View>
      </View>
      </View>
      
      
       
       <ScrollView >
         {/* {
           list.length?(

<SwipeableFlatList
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{padding:10,paddingBottom:100}}
            data={list}
            
            renderItem={({item})=>(
              
              <View style={[
                styles.listItem
              ]}>
                  <TouchableOpacity onPress={()=>navigation.navigate('List',item)}>
                  <Text style={{fontSize:10}}>swipe right to delete n click Chevron to update</Text>
                  
                
                  <ListItem  style={{backgroundColor:iscomplete? 'gray':'#fff' }}>
                <ListItem.Content>
                    <ListItem.Title>
                        {item.text}
                    </ListItem.Title>
                    <Text>{item.formatD}</Text>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem> 
      
      <View>
      
      </View>
                  
      
                  </TouchableOpacity>
                 
                  
            
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
              <TouchableOpacity onPress={()=>handleDelete(item.key)}>
           <Icon name="delete" size={30} color={'red'} />
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
           ):(
             <Text style={{fontSize:30}}>
             Nothing 
             </Text>
           )
         } */}
      
    
{/* 
            <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>You have {list.length} pending tasks</Text>
          <TouchableOpacity onPress={()=>clearTodos()}>
                                <Icon name="delete" size={30} color='red' />
                                </TouchableOpacity>
        
         </View> */}
         </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
            borderRadius: 20,
            width: '50%',
            // backgroundColor: 'blue',
            padding: 20,
            textAlign: "center",
            textTransform: "uppercase",
            height:65,
            
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
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center'
  }
  });

export default Todo
