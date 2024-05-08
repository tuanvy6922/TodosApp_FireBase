import { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth"
import { createAccount } from "../store";
import { Image } from "react-native";

const Register =()=>{
    const [fullName,setFullname]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [confirmpassword,setConfirmPassword]= useState("")
    const handleCreateAccount=()=>{
        if (!email.includes('@')) {
            Alert.alert('Error', 'Email must contain "@"');
            return;
        }
        if (fullName.trim() === '') {
            Alert.alert('Error', 'Full Name cannot be empty');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmpassword) {
            Alert.alert('Error', 'Password and Confirm Password do not match');
            return;
        }
        // auth().createUserWithEmailAndPassword(fullName,email,password,confirmpassword)
        // .then(()=> Alert.alert("dang ky thanh cong"))
        // .catch(e => Alert.alert(e.message))
        const role ="customer"
        createAccount(fullName,email,password,role)
    }
    return(
        <View style ={{flex:1, justifyContent:"center",backgroundColor:'white'}}>
           <Image
              style ={{width: 150, height: 150, alignSelf:"center",marginBottom:50}}
              source={require('./assets/logo.png')}
              resize
            ></Image>
            <TextInput
                style={styles.passwordContainer2}
                label={"Full Name"}
                value={fullName}
                onChangeText={setFullname}
            />
            <TextInput
                style={styles.passwordContainer2}
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            {/* <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            /> */}
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.passwordContainer1}
                    label={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry ={showPassword}
                    right={
                        <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)}/>
                    }
                />
                 {/* <IconButton        
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                /> */}
            </View>
            <TextInput
            style={styles.passwordContainer2}
                label={"Confirm Password"}
                value={confirmpassword}
                onChangeText={setConfirmPassword}
            />
            <Button
                style={styles.passwordContainer3}
                mode="contained" onPress={handleCreateAccount}>
                Create Account
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    passwordContainer: {
    flexDirection:'row',
    margin:10
    },
    passwordContainer1: {
        flex:1
        },
    passwordContainer2: {
        margin:10
        },
    passwordContainer3: {
        margin:10
        },
});
export default Register