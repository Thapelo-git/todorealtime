import React from "react"
import firebase from "./firebase"

const db =firebase.ref('/todo')

class Users {
   getData(){
       return db
   }

   createTodo(data){
       return db.push(data)
   }

   getDataById(key){
       return db.child(key)
   }

   updateTodo(key,data){
       return db.child(key).update(data)
   }

//    deleteTodo(key){
//     //    return db.child(key).remove()
//     return firebase.ref().child(`/todo/${key}`).remove((err)=>{
//         if(err){
//             console.log(err)
//         }
//     })
//    }
   clearall(){
       return db.remove()
   }
}

export default new Users()