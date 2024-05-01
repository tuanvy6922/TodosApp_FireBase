import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';



const ToDoApp=()=>{
    const [newToDo, setNewToDo] = useState("") 
    const [toDos, settoDos] = useState([])
    const cToDos = firestore().collection("ToDos") 
    const addNewToDo = ()=>{
        cToDos.add({
            title: newToDo,
            complete: false
        })
        .then(() => console.log("Add new todo"))
        .catch(e => console.log(e.message))
    }
    useEffect(()=>{
        cToDos.onSnapshot(
            listToDos=>{
                var result = []
                listToDos.forEach(
                    todo =>{
                        const{title, complete}= todo.data()
                        result.push({
                            id: todo.id,
                            title,
                            complete
                        })
                    }
                )
                console.log(result)
                settoDos(result)
            }
        )
    }, [])
    const updateToDo = ({id, complete})=>{
        cToDos.doc(id)
        .update({
            complete: !complete
        })
        .then(()=> console.log("Update thanh cong"))
    }
    const renderItem =({item})=>{
        const{id,title,complete}= item
        return(
            <Button icon={(complete)? "home" : "star"} onPress={()=>updateToDo(item)}>
                {title}
            </Button>
        )
    }
    return (
        <View style={{flex:1 }}>
            <Appbar style={{backgroundColor: "blue"}}>
                <Appbar.Content title="To Do Apps" style={{alignItems: "center"}} color="white" />
            </Appbar>
            <FlatList
                data={toDos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <TextInput 
                label={"New ToDo"}
                value={newToDo}
                onChangeText={setNewToDo}
            />
            <Button onPress={addNewToDo}>
                Add new todo
            </Button>
        </View>
    )
}
export default ToDoApp;