import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth"

const Login =({navigation})=>{
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const handleLogin=()=>{
        auth().signInWithEmailAndPassword(email,password)
        .then(()=> Alert.alert("Dang nhap thanh cong"))
        .catch(e => Alert.alert(e.message))
    }
    return(
        <View style ={{flex:1, justifyContent:"center"}}>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin}>
                Login
            </Button>
            <View style={{flexDirection: "row"}}>
                <Button onPress={()=> navigation.navigate("Register")}> Create New Account </Button>
                <Button onPress={()=> navigation.navigate("ForgotPassword")}> Forgot Password </Button>
            </View>
        </View>
    )
}
export default Login