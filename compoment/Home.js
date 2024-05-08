import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import {FlatList, View, ScrollView, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Login from "./Login";
import { logout, useMyContextProvider } from "../store";


const Home=({navigation})=>{
    const [newToDo, setNewToDo] = useState("") 
    const [toDos, settoDos] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [fullName, setFullName] = useState("");
    const cToDos = firestore().collection("Jobs")
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
          navigation.navigate("Login")
      }, [userLogin]);
    

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = auth().currentUser;
            console.log(currentUser); // Log currentUser object for debugging
            if (currentUser) {
                setFullName(currentUser.displayName);
            }
        };
        getCurrentUser();
    }, []);
    

    const addNewToDo = ()=>{
        cToDos.add({
            title: newToDo,
            complete: false
        })
        .then(() => console.log("Add new todo"))
        .catch(e => console.log(e.message))
        .finally(() => {
            // Sau khi thêm mới todo, reset trạng thái của TextInput và disable button
            setNewToDo("");
            setButtonDisabled(true);
        });
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

    useEffect(() => {
        if (newToDo.trim() !== "") {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [newToDo]);

    const handleLogout = () => {
        logout(dispatch);
    };

    return (
        <View style={{flex:1 }}>
            <Appbar style={{backgroundColor: "blue"}}>
                <Appbar.Content title={ 
                    <Text style={{ color: 'white',fontSize:30, marginRight:20 }} >Welcome: {userLogin ? userLogin.fullName : 'User-Name'}</Text>
                } />
                <Appbar.Action  icon="logout" onPress={handleLogout} />
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
            <Button 
            mode="contained"
             onPress={addNewToDo} disabled={buttonDisabled}>
                Add new todo
            </Button>
        </View>
    )
}
export default Home;