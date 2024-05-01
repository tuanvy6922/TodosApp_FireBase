import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth"

const ForgotPassword =()=>{
    const [email,setEmail]= useState("")
    
    const handleSendEmail=()=>{
        auth().sendPasswordResetEmail(email)
        .then(()=> Alert.alert("link reset password da gui"))
        .catch(e => Alert.alert(e.message))
    }
    return(
        <View style ={{flex:1, justifyContent:"center"}}>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            
            <Button mode="contained" onPress={handleSendEmail}>
                Send Email
            </Button>
        </View>
    )
}
export default ForgotPassword